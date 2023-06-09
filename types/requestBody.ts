import { number, string, z } from 'zod';

export const CreateLocationSchema = z.object({
  name: string(),
  description: string(),
  locationType: z.enum(['3pw', 'sup', 'amz']),
  address_street1: string(),
  address_street2: string().optional(),
  address_city: string(),
  address_state: string(),
  address_zip: string(),
  address_country: string(),
  contact_fname: string(),
  contact_lname: string().optional(),
  contact_email: string().email(),
  contact_phone: string(),
  contact_fax: string().optional(),
});

export const SaveOtherQuantitySchema = z.object({
  item_id: number(),
  location_id: number(),
  to_location_id: number().optional(),
  location_status_id: number(),
  quantity: number(),
});

export const SaveContactSchema = z.object({
  fname: string(),
  lname: string().optional(),
  email: string().email(),
  phone: string(),
  fax: string().optional(),
});
