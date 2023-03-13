import { User } from '@supabase/supabase-js';

export interface ProductItem {
  name: string;
  asin: string;
  fnSku: string;
  sellerSku: string;
}

export interface SaveProductData {
  user: User;
  product: ProductItem;
  quantities: ItemQuantity;
}

export interface UpdateItem {
  user: User;
  item: any;
}

export interface ItemQuantity {
  user: User;
  itemId: number;
  amzFulfillable: number;
  amzInboundWorking: number;
  amzInboundShipped: number;
  amzInboundReceiving: number;
  amzTotal: number;
}
