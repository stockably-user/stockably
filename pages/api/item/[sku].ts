import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { InventoryService } from '../../../services/amazon/InventoryService';
import { TokenService } from '../../../services/supabase/TokenService';
import { Region } from '../../../types/region';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    // const {
    //   data: { user },
    // } = await sb.auth.getUser();

    switch (req.method) {
      case 'GET': {
        const sku = req.query['sku'] as string;
        const t = new TokenService(sb);
        const token = await t.getZacksRefreshTokenByRegion(Region.na);

        const i = new InventoryService();
        const inv = await i.getInventoryListing({
          region: Region.na,
          sellerPartnerId: 'A13MZP1Z7T7UJN',
          marketplaceId: 'ATVPDKIKX0DER',
          refreshToken: token?.refresh_token,
          sku,
        });

        if (inv) {
          res.status(200).json({ data: inv });
        } else {
          res.status(500).json({ message: 'no good', error: {} });
        }
        break;
      }
    }
  }
}
