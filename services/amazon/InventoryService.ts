import {
  GetInventoryListing,
  GetInventorySummary,
} from "../../types/inventory";
import { SpApiService } from "./SpApiService";

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

      // get inventory summary for marketplace
      const inventorySummary = await client.callAPI({
        operation: "fbaInventory.getInventorySummaries",
        query: {
          details: true,
          granularityType: "Marketplace",
          granularityId: args.marketplaceId,
          marketplaceIds: [args.marketplaceId],
        },
      });

      return inventorySummary;
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
        operation: "listingsItems.getListingsItem",
        path: {
          sellerId: args.sellerPartnerId,
          sku: args.sku,
        },
        query: {
          marketplaceIds: args.marketplaceId,
        },
        options: {
          version: "2021-08-01",
        },
      });

      return sku;
    } catch (error) {
      console.error(error);
    }
  }
}
