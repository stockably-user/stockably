import { SupabaseClient } from '@supabase/supabase-js';
import { SaveProductData } from '../../types/product';

export class ProductService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async saveProductData(args: SaveProductData) {
    const product = args.products[0];
    const { data, error } = await this.supabase.from('product_items').insert([
      {
        name: product.name,
        asin: product.asin,
        sku: product.sellerSku,
        fnsku: product.fnSku,
        user_id: args.user.id,
      },
    ]);

    if (error) {
      console.log(error);
      return null;
    } else {
      console.log('data', data);
      return data;
    }
  }
}
