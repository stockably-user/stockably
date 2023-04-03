import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { InventoryService } from '../../../services/amazon/InventoryService';
import { TokenService } from '../../../services/supabase/TokenService';
import { Region } from '../../../types/region';
import { SaveContactSchema } from '../../../types/requestBody';
import { ContactService } from '../../../services/supabase/ContactService';

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
          const schema = SaveContactSchema.parse(req.body);

          const c = new ContactService(sb);
          const result = await c.saveContact({
            user,
            contact: schema,
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
