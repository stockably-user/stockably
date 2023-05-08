import { SupabaseClient, User } from '@supabase/supabase-js';
import {
  ItemQuantity,
  ProductItem,
  SaveOtherQuantity,
  SaveProductData,
  SaveProductsFromAmazon,
  UpdateItem,
} from '../../types/product';

export class ProductService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getInventory(user: User) {
    const { data, error } = await this.supabase
      .from('product_items')
      .select(
        `
        id,
        name,
        asin,
        sku,
        fnsku,
        amz_item_quantities (
          amz_fulfillable,
          amz_inbound_working,
          amz_inbound_shipped,
          amz_inbound_receiving,
          amz_total
        ),
        other_item_quantities (
          location_id,
          to_location_id,
          location_status_id,
          quantity
        )
      `
      )
      .eq('user_id', user.id);

    if (error) {
      return error;
    } else {
      return data;
    }
  }

  async saveProductsFromAmazon(args: SaveProductsFromAmazon) {
    // given amazon inventory data, save quantities and items to db
    for (let i of args.inventorySummary) {
      const inv = i.payload;
      if (inv) {
        for (let item of inv.inventorySummaries) {
          const p: ProductItem = {
            name: item.productName!,
            fnSku: item.fnSku!,
            sellerSku: item.sellerSku!,
            asin: item.asin!,
          };

          const q: ItemQuantity = {
            user: args.user,
            amzFulfillable: item.inventoryDetails?.fulfillableQuantity!,
            amzInboundReceiving:
              item.inventoryDetails?.inboundReceivingQuantity!,
            amzInboundShipped: item.inventoryDetails?.inboundShippedQuantity!,
            amzInboundWorking: item.inventoryDetails?.inboundWorkingQuantity!,
            amzTotal: item.totalQuantity!,
          };

          await this.saveProductData({
            user: args.user,
            product: p,
            quantities: q,
          });
        }
      }
    }

    return { data: 'success' };
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

  async saveOtherQuantity({
    user,
    itemId,
    locationId,
    toLocationId,
    locationStatusId,
    quantity,
  }: SaveOtherQuantity) {
    const userId = user.id;

    const { data, error } = await this.supabase
      .from('other_item_quantities')
      .insert([
        {
          user_id: userId,
          item_id: itemId,
          location_id: locationId,
          to_location_id: toLocationId,
          location_status_id: locationStatusId,
          quantity: quantity,
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
      return qData;
    }
  }
}
