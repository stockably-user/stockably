import { Region } from './region';

export const SpApiRoutes = {
  getInventorySummaries: 'fbaInventory.getInventorySummaries',
  getInventoryListing: 'listingsItems.getListingsItem',
} as const;

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
