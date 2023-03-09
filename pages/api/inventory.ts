import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../utils';
import { InventoryService } from '../../services/amazon/InventoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sb = await checkForActiveSession(req, res);

  if (sb) {
    switch (req.method) {
      case 'GET':
        // get user
        const {
          data: { user },
        } = await sb.auth.getUser();

        // TODO: get refresh token, pass in region, marketplaceId

        const i = new InventoryService();
        const inv = await i.getInventorySummary({
          region: 'na',
          marketplaceId: 'ATVPDKIKX0DER',
          refreshToken: 'TEST_TOKEN',
        });

        if (inv) {
          res.status(200).json({ data: inv });
        } else {
          res.status(500).json({ message: 'no good', error: {} });
        }
    }
  }
}
