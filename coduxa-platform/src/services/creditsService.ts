import { supabase } from "../components/lib/supabaseClient";

export async function getUserCredits(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("user_credits")
    .select("credits")
    .eq("user_id", userId)
    .single();

  if (error && (error as { code?: string }).code !== "PGRST116") {
    console.error("Supabase error:", error);
    return 0;
  }

  if (!data) {
    const { error: insertError } = await supabase
      .from("user_credits")
      .insert({ user_id: userId, credits: 0 });
    if (insertError) {
      console.error("Failed to create credits row:", insertError);
      return 0;
    }
    return 0;
  }

  return (data as { credits: number }).credits ?? 0;
}
  