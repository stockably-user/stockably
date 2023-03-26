import { NextApiRequest, NextApiResponse } from 'next';
import { checkForActiveSession } from '../../../utils';
import { CreateLocationSchema } from '../../../types/requestBody';
import { Address, Contact, Location } from '../../../types/location';
import { ProductService } from '../../../services/supabase/ProductService';
import { LocationService } from '../../../services/supabase/LocationService';

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
        try {
          const schema = CreateLocationSchema.parse(req.body);

          const l: Location = {
            name: schema.name,
            description: schema.description,
          };

          const a: Address = {
            street1: schema.address_street1,
            street2: schema.address_street2,
            city: schema.address_city,
            state: schema.address_state,
            country: schema.address_country,
            zip: schema.address_zip,
          };

          const c: Contact = {
            fname: schema.contact_fname,
            lname: schema.contact_lname,
            email: schema.contact_email,
            phone: schema.contact_phone,
            fax: schema.contact_fax,
          };

          const ls = new LocationService(sb);
          const data = await ls.saveLocation({
            user,
            location: l,
            address: a,
            contact: c,
          });

          res.status(200).json({ data: data });
          break;
        } catch (error) {
          res.status(500).json({ message: error });
          break;
        }
    }
  }
}
