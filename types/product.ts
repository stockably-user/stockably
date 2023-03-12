import { User } from '@supabase/supabase-js';


export interface ProductItem {
  name: string;
  asin: string;
  fnSku: string;
  sellerSku: string;
}

export interface SaveProductData {
  user: User;
  products: ProductItem[];
}
