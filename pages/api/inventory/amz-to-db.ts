import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { InventoryService } from '../../../services/amazon/InventoryService';
import { TokenService } from '../../../services/supabase/TokenService';
import { Region } from '../../../types/region';
import { ProductService } from '../../../services/supabase/ProductService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();

    switch (req.method) {
      case 'POST': {
        if (!user) {
          res.status(403).json({ message: 'no user found' });
          break;
        }
        const t = new TokenService(sb);
        const token = await t.getZacksRefreshTokenByRegion(Region.na);

        const i = new InventoryService();
        const inv = await i.getInventorySummary({
          region: Region.na,
          marketplaceId: 'ATVPDKIKX0DER',
          refreshToken: token?.refresh_token,
        });

        if (!inv) {
          res.status(500).json({ message: 'no good', error: {} });
          break;
        }

        const p = new ProductService(sb);
        const result = await p.saveProductsFromAmazon({
          user,
          inventorySummary: inv,
        });

        if (result) {
          res.status(200).json({ data: result });
        } else {
          res.status(500).json({ message: 'no good', error: {} });
        }
        break;
      }
    }
  }
}
