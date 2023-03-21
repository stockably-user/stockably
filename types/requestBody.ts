import { string, z } from 'zod';

export const CreateLocationSchema = z.object({
  name: string(),
  description: string(),
  locationType: z.enum(['3pw', 'sup', 'amz']).optional(),
  address_street1: string().optional(),
  address_street2: string().optional(),
  address_city: string().optional(),
  address_state: string().optional(),
  address_zip: string().optional(),
  address_country: string().optional(),
  contact_fname: string().optional(),
  contact_lname: string().optional(),
  contact_email: string().email().optional(),
  contact_phone: string().optional(),
  contact_fax: string().optional(),
});
