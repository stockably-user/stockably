import { SupabaseClient, User } from '@supabase/supabase-js';
import { SaveProductData, UpdateItem } from '../../types/product';

export class ProductService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getProductData() {
    // retrieve product_item data for marketplace
    // for each item, retrieve
  }

  async deleteTestData(user: User) {
    const { data, error } = await this.supabase.rpc(
      'remove_test_data_for_user',
      {
        _user_id: user.id,
      }
    );

    if (error) {
      console.log(error);
      return error;
    }

    return data;
  }

  async updateItem(args: UpdateItem) {
    const { user, item } = args;
    const { data, error } = await this.supabase
      .from('product_items')
      .update({ image_url: item.mainImage.link })
      .eq('user_id', user.id);

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
