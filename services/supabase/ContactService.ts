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

  async saveProductData(args: SaveProductData) {
    const product = args.product;
    const { data, error } = await this.supabase
      .from('product_items')
      .insert([
        {
          name: product.name,
          asin: product.asin,
          sku: product.sellerSku,
          fnsku: product.fnSku,
          user_id: args.user.id,
        },
      ])
      .select('id');
    if (error) {
      console.log(error);
      return error;
    }

    const { data: qData, error: qError } = await this.supabase
      .from('amz_item_quantities')
      .insert([
        {
          item_id: data[0].id,
          amz_fulfillable: args.quantities.amzFulfillable,
          amz_inbound_working: args.quantities.amzInboundWorking,
          amz_inbound_shipped: args.quantities.amzInboundShipped,
          amz_inbound_receiving: args.quantities.amzInboundReceiving,
          amz_total: args.quantities.amzTotal,
          user_id: args.user.id,
        },
      ]);
    if (qError) {
      console.log(qError);
      return qError;
    } else {
      return data;
    }
  }
}
