import {
  GetInventoryListing,
  GetInventorySummary,
  SpApiRoutes,
} from '../../types/inventory';
import { SpApiService } from './SpApiService';

export class InventoryService {
  private readonly spApi: SpApiService;

  constructor() {
    this.spApi = new SpApiService();
  }

  async getInventorySummary(args: GetInventorySummary) {
    try {
      const client = await this.spApi.createSpApiClient({
        region: args.region,
        refreshToken: args.refreshToken,
        sandbox: false,
      });

      const inventory = [];
      let token = '';
      // get inventory summary for marketplace
      const inventorySummary = await client.callAPI({
        operation: SpApiRoutes.getInventorySummaries,
        query: {
          details: true,
          granularityType: 'Marketplace',
          granularityId: args.marketplaceId,
          marketplaceIds: [args.marketplaceId],
        },
      });
      inventory.push(inventorySummary);
      token = inventorySummary['nextToken'];

      while (token) {
        const inventorySummary = await client.callAPI({
          operation: SpApiRoutes.getInventorySummaries,
          query: {
            details: true,
            granularityType: 'Marketplace',
            granularityId: args.marketplaceId,
            marketplaceIds: [args.marketplaceId],
            nextToken: token,
          },
        });
        inventory.push(inventorySummary);
        token = inventorySummary['nextToken'];
      }

      return inventory;
    } catch (error) {
      console.error(error);
    }
  }

  async getInventoryListing(args: GetInventoryListing) {
    try {
      const client = await this.spApi.createSpApiClient({
        region: args.region,
        refreshToken: args.refreshToken,
        sandbox: false,
      });

      const sku = await client.callAPI({
        operation: SpApiRoutes.getInventoryListing,
        path: {
          sellerId: args.sellerPartnerId,
          sku: args.sku,
        },
        query: {
          marketplaceIds: args.marketplaceId,
        },
        options: {
          version: '2021-08-01',
        },
      });

      return sku;
    } catch (error) {
      console.error(error);
    }
  }
}
