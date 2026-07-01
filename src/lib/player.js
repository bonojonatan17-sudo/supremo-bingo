import { supabase } from "./supabase";

export async function getPlayer(name) {
  const { data } = await supabase
    .from("players")
    .select("*")
    .eq("name", name)
    .single();

  return data;
}

export async function removeTicket(name) {
  const player = await getPlayer(name);

  if (!player) return false;

  if (player.tickets <= 0) return false;

  await supabase
    .from("players")
    .update({
      tickets: player.tickets - 1,
    })
    .eq("id", player.id);

  return true;
}