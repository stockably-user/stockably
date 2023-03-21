import { SupabaseClient, User } from '@supabase/supabase-js';
import {
  Address,
  Contact,
  Location,
  LocationTypeMeta,
} from '../../types/location';

interface SaveLocation {
  user: User;
  location: Location;
  address: Address;
  contact: Contact;
}

export class LocationService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getTest() {
    return LocationTypeMeta;
  }

  async deleteTestLocations(user: User) {}

  async saveLocation(args: SaveLocation) {
    const { location, contact, address } = args;

    const { data: addressData, error: addressError } = await this.supabase
      .from('address')
      .insert([
        {
          street_1: address.street1,
          street_2: address.street2,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
        },
      ])
      .select('id');

    if (addressError) {
      return addressError;
    }

    const { data: contactData, error: contactError } = await this.supabase
      .from('contacts')
      .insert([
        {
          first_name: contact.fname,
          last_name: contact.fname,
          email: contact.email,
          phone: contact.phone,
          fax: contact.fax,
          address_id: addressData[0].id,
        },
      ])
      .select('id');

    if (contactError) {
      return contactError;
    }

    const { data, error } = await this.supabase
      .from('locations')
      .insert([
        {
          name: location.name,
          description: location.description,
          location_type_id: location.location_type_id,
          address_id: addressData[0].id,
          contact_id: contactData[0].id,
        },
      ])
      .select('id');

    if (error) {
      return error;
    }

    return {
      locationId: data[0].id,
    };
  }
}
