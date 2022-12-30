export const MarketPlaces_NorthAmerica = {
  CANADA: { countryCode: "CA", endpoint: "https://sellercentral.amazon.ca" },
  US: { countryCode: "US", endpoint: "https://sellercentral.amazon.com" },
  MEXICO: {
    countryCode: "MX",
    endpoint: "https://sellercentral.amazon.com.mx",
  },
  BRAZIL: { countryCode: "BR", endpoint: "" },
};

export const MarketPlaces_Europe = {
  SPAIN: {
    countryCode: "ES",
    endpoint: "https://sellercentral-europe.amazon.com",
  },
  GB: {
    countryCode: "GB",
    endpoint: "https://sellercentral-europe.amazon.com",
  }, // UK
  FRANCE: {
    countryCode: "FR",
    endpoint: "https://sellercentral-europe.amazon.com",
  },
  NETHERLANDS: {
    countryCode: "NL",
    endpoint: "https://sellercentral.amazon.nl",
  },
  GERMANY: {
    countryCode: "DE",
    endpoint: "https://sellercentral-europe.amazon.com",
  },
  ITALY: {
    countryCode: "IT",
    endpoint: "https://sellercentral-europe.amazon.com",
  },
  SWEDEN: { countryCode: "SE", endpoint: "https://sellercentral.amazon.se" },
  POLAND: { countryCode: "PL", endpoint: "https://sellercentral.amazon.pl" },
  TURKEY: {
    countryCode: "TR",
    endpoint: "https://sellercentral.amazon.com.tr",
  },
  UAE: { countryCode: "AE", endpoint: "https://sellercentral.amazon.ae" },
  INDIA: { countryCode: "IN", endpoint: "https://sellercentral.amazon.in" },
};

export const MarketPlaces_FarEast = {
  SINGAPORE: { countryCode: "SG", endpoint: "https://sellercentral.amazon.sg" },
  AUSTRALIA: {
    countryCode: "AU",
    endpoint: "https://sellercentral.amazon.com.au",
  },
  JAPAN: { countryCode: "JP", endpoint: "https://sellercentral.amazon.co.jp" },
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
