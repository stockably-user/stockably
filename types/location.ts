export const LocationType: { [key: string]: string } = {
  '3pw': '3pw',
  sup: 'sup',
  amz: 'amz',
} as const;

export const LocationTypeMeta = {
  [LocationType['3pw']]: {
    id: 1,
    token: LocationType['3pw'],
    name: 'Third party warehouse',
  },
  [LocationType.sup]: {
    id: 2,
    token: LocationType.sup,
    name: 'Supplier',
  },
  [LocationType.amz]: {
    id: 3,
    token: LocationType.amz,
    name: 'Amazon warehouse',
  },
};
