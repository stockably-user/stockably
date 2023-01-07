import { User } from "@supabase/supabase-js";
import { Region } from "./region";

export type GetRefreshTokenByRegion = {
  region: Region;
  user: User;
};
