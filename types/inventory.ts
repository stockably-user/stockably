import { Region } from "./region";

export type GetInventorySummary = {
  region: Region;
  marketplaceId: string;
  refreshToken: string;
};

export type GetInventoryListing = {
  region: Region;
  refreshToken: string;
  sellerPartnerId: string;
  sku: string;
  marketplaceId: string;
};
