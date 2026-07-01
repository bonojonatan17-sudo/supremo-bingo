import { supabase } from "./supabase";

export async function getJackpot() {
  const { data } = await supabase
    .from("settings")
    .select("jackpot")
    .eq("id", 1)
    .single();

  return data?.jackpot ?? 500000;
}

export async function setJackpot(value) {
  await supabase
    .from("settings")
    .update({
      jackpot: value,
    })
    .eq("id", 1);
}