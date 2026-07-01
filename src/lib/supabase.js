import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pofkctbtzwlzapicksjp.supabase.co";

const supabaseKey =
  "sb_publishable_f24X_HLVZIxh2tDMsdXang_xXP1RqYp";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);