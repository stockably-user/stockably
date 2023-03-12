import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../utils';
import { InventoryService } from '../../services/amazon/InventoryService';
import { TokenService } from '../../services/supabase/TokenService';
import { Region } from '../../types/region';
import { ProductService } from '../../services/supabase/ProductService';
import { STATUS_CODES } from 'http';

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
      case 'GET':
        // TODO: get refresh token, pass in region, marketplaceId
        const t = new TokenService(sb);
        const token = await t.getZacksRefreshTokenByRegion(Region.na);
        console.log('refresh token is ', token);

        const i = new InventoryService();
        const inv = await i.getInventorySummary({
          region: Region.na,
          marketplaceId: 'ATVPDKIKX0DER',
          refreshToken: token?.refresh_token,
        });

        if (inv) {
          res.status(200).json({ data: inv });
        } else {
          res.status(500).json({ message: 'no good', error: {} });
        }
        break;

      case 'POST':
        // Saving inventory
        console.log('posting an item');

        if (!user) {
          res.status(403).json({ message: 'no user found' });
        } else {
          const p = new ProductService(sb);
          const sampleItem = {
            asin: 'B07JMHN6YC',
            fnSku: 'X002KXLHVH',
            sellerSku: 'ZO-JRGSL-GOLD',
            name: 'Jade Roller and Gua Sha Set - Jade Face Roller, 100% Natural Jade Stone Set, Dual Sided Face Massager, Stimulates Blood Flow, Relieves Stress, Reduces Signs of Aging, Travel Pouch Included, Gift Box',
          };

          const data = await p.saveProductData({
            user: user,
            products: [sampleItem],
          });

          res.status(200).json({ data: data });
        }
    }
  }
}
