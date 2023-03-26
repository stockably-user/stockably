import { User } from '@supabase/supabase-js';
import { GetInventorySummariesResponse } from 'amazon-sp-api/lib/typings/operations/fbaInventory';

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

export interface SaveOtherQuantity {
  user: User;
  itemId: number;
  locationId: number;
  toLocationId?: number;
  locationStatusId: number;
  quantity: number;
}

export interface UpdateItem {
  user: User;
  item: any;
}

export interface SaveProductsFromAmazon {
  user: User;
  inventorySummary: GetInventorySummariesResponse[];
}

export interface ItemQuantity {
  user: User;
  itemId?: number;
  amzFulfillable: number;
  amzInboundWorking: number;
  amzInboundShipped: number;
  amzInboundReceiving: number;
  amzTotal: number;
}
