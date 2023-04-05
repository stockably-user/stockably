import { SupabaseClient, User } from '@supabase/supabase-js';
import {
  ItemQuantity,
  ProductItem,
  SaveOtherQuantity,
  SaveProductData,
  SaveProductsFromAmazon,
  UpdateItem,
} from '../../types/product';
import { SaveContact } from '../../types/contact';

export class ContactService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async saveContact(args: SaveContact) {
    const { user, contact } = args;
    const { data, error } = await this.supabase
      .from('contacts')
      .insert([
        {
          user_id: user.id,
          first_name: contact.fname,
          last_name: contact.lname,
          email: contact.email,
          phone: contact.phone,
          fax: contact.fax,
        },
      ])
      .select('id');

    if (error) {
      console.log(error);
      return error;
    }

    return data;
  }
}
