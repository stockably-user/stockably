import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
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

    if (!user) {
      res.status(403).json({ message: 'no user', error: {} });
      return;
    }

    switch (req.method) {
      case 'GET': {
        const p = new ProductService(sb);
        const data = await p.getInventory(user);

        res.status(200).json({ data });
        break;
      }
    }
  }
}
