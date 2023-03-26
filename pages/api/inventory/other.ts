import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { InventoryService } from '../../../services/amazon/InventoryService';
import { TokenService } from '../../../services/supabase/TokenService';
import { Region } from '../../../types/region';
import { ProductService } from '../../../services/supabase/ProductService';
import { SaveOtherQuantitySchema } from '../../../types/requestBody';

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
      case 'POST':
        if (!user) {
          res.status(403).json({ message: 'no user found' });
          break;
        }

        try {
          const schema = SaveOtherQuantitySchema.parse(req.body);

          const p = new ProductService(sb);
          const result = await p.saveOtherQuantity({
            user,
            locationId: schema.location_id,
            toLocationId: schema.to_location_id,
            locationStatusId: schema.location_status_id,
            quantity: schema.quantity,
            itemId: schema.item_id,
          });

          if (result) {
            res.status(200).json({ data: result });
          } else {
            res.status(500).json({ message: 'no good', error: {} });
          }
          break;
        } catch (error) {
          res.status(500).json({ message: 'no good', error: {} });
          break;
        }
    }
  }
}
