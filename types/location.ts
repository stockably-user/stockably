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

export const LocationTypeFormMeta = Object.keys(LocationTypeMeta).map(
  (locationTypeName) => {
    return {
      value: locationTypeName,
      label: LocationTypeMeta[locationTypeName].name,
    };
  }
);

export interface Location {
  name: string;
  description: string;
  location_type_id?: number;
  address_id?: number;
  contact_id?: number;
}

export interface Address {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface Contact {
  fname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address_id?: number;
}
