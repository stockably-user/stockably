import { SupabaseClient, User } from '@supabase/supabase-js';
import { LocationTypeMeta } from '../../types/location';
import { SaveProductData } from '../../types/product';

interface SaveLocation {
  user: User;
}

export class LocationService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getTest() {
    return LocationTypeMeta;
  }
  async saveLocation(args: SaveLocation) {}
}
