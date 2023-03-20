import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { ProductService } from '../../../services/supabase/ProductService';
import { InventoryService } from '../../../services/amazon/InventoryService';
import { TokenService } from '../../../services/supabase/TokenService';
import { Region } from '../../../types/region';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();

    if (!user) {
      res.status(403).json({ message: 'no user', error: {} });
      return;
    }

    switch (req.method) {
      case 'POST':
        const sku = 'ZO-JRGSL-GOLD';
        const t = new TokenService(sb);
        const token = await t.getZacksRefreshTokenByRegion(Region.na);

        const i = new InventoryService();
        const item = await i.getInventoryListing({
          region: Region.na,
          refreshToken: token?.refresh_token,
          marketplaceId: 'ATVPDKIKX0DER',
          sellerPartnerId: 'A13MZP1Z7T7UJN',
          sku: sku,
        });

        const itemData = item.summaries[0];

        const p = new ProductService(sb);
        const data = p.updateItem({ user, item: itemData });

        res.status(200).json({ data });
        break;
    }
  }
}
