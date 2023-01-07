import { SupabaseClient } from "@supabase/supabase-js";
import { GetRefreshTokenByRegion } from "../../types/token";

export class TokenService {
  private readonly supabase!: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getRefreshTokenByRegion(args: GetRefreshTokenByRegion) {
    console.log(`getting token for region: ${args.region}...`);

    let res = await this.supabase
      .from("amazon_consents")
      .select(
        `
        created_at,
        refresh_token,
        regions!inner (
          id,
          code
        )
      `
      )
      .eq("user_id", args.user.id)
      .filter("regions.code", "eq", args.region)
      .order("created_at", { ascending: false });

    if (res.status == 200 && res.data) {
      return res.data[0];
    }

    return null;
  }
}
