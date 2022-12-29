export const MarketPlaces_NorthAmerica = {
  CANADA: { countryCode: "CA", endpoint: "https://sellercentral.amazon.ca" },
  US: { countryCode: "US", endpoint: "https://sellercentral.amazon.com" },
  MEXICO: {
    countryCode: "MX",
    endpoint: "https://sellercentral.amazon.com.mx",
  },
};

export const MarketPlaces_Europe = {
  SPAIN: "https://sellercentral-europe.amazon.com",
  GB: "https://sellercentral-europe.amazon.com", // UK
  FRANCE: "https://sellercentral-europe.amazon.com",
  NETHERLANDS: "https://sellercentral.amazon.nl",
  GERMANY: "https://sellercentral-europe.amazon.com",
  ITALY: "https://sellercentral-europe.amazon.com",
  SWEDEN: "https://sellercentral.amazon.se",
  POLAND: "https://sellercentral.amazon.pl",
  TURKEY: "https://sellercentral.amazon.com.tr",
  UAE: "https://sellercentral.amazon.ae",
  INDIA: "https://sellercentral.amazon.in",
};

export const MarketPlaces_FarEast = {
  SINGAPORE: "https://sellercentral.amazon.sg",
  AUSTRALIA: "https://sellercentral.amazon.com.au",
  JAPAN: "https://sellercentral.amazon.co.jp",
};

export const Marketplaces: Record<string, any> = {
  ...MarketPlaces_NorthAmerica,
  ...MarketPlaces_Europe,
  ...MarketPlaces_FarEast,
};

// export const MarketplaceButtons = {
//   // keys have to be country codes
//   US: {
//     name: "North America",
//     url: "https://sellercentral.amazon.com",
//   },
//   GB: {
//     name: "Europe",
//     url: "https://sellercentral-europe.amazon.com",
//   },
// };

// export type Marketplace = {
//   id: number;
//   country: string;
//   awsMarketplaceId: string;
//   countryCode: string;
// };
