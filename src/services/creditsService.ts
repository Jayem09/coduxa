import { supabase } from "../components/lib/supabaseClient";

export async function getUserCredits(userId: string): Promise<number> {
  console.log(`[getUserCredits] Getting credits for user: ${userId}`);
  
  const { data, error } = await supabase
    .from("user_credits")
    .select("credits")
    .eq("user_id", userId)
    .single();

  console.log(`[getUserCredits] Query result - data:`, data, "error:", error);

  if (error && (error as { code?: string }).code !== "PGRST116") {
    console.error("[getUserCredits] Supabase error:", error);
    return 0;
  }

  if (!data) {
    console.log(`[getUserCredits] No data found, creating new record for user: ${userId}`);
    const { error: insertError } = await supabase
      .from("user_credits")
      .insert({ user_id: userId, credits: 0 });
    if (insertError) {
      console.error("[getUserCredits] Failed to create credits row:", insertError);
      return 0;
    }
    console.log(`[getUserCredits] Created new record with 0 credits for user: ${userId}`);
    return 0;
  }

  const credits = (data as { credits: number }).credits ?? 0;
  console.log(`[getUserCredits] Found ${credits} credits for user: ${userId}`);
  return credits;
}

export async function deductCredits(userId: string, amount: number): Promise<{ success: boolean; newBalance: number; error?: string }> {
  try {
    console.log(`[deductCredits] Starting deduction for user ${userId}, amount: ${amount}`);
    
    // First, get current credits
    const currentCredits = await getUserCredits(userId);
    console.log(`[deductCredits] Current credits: ${currentCredits}`);
    
    if (currentCredits < amount) {
      console.log(`[deductCredits] Insufficient credits: ${currentCredits} < ${amount}`);
      return {
        success: false,
        newBalance: currentCredits,
        error: `Insufficient credits. You have ${currentCredits} credits but need ${amount} credits.`
      };
    }

    const newBalance = currentCredits - amount;
    console.log(`[deductCredits] New balance will be: ${newBalance}`);

    // Update credits in database
    const { data: updateData, error } = await supabase
      .from("user_credits")
      .update({ credits: newBalance })
      .eq("user_id", userId)
      .select();

    console.log("[deductCredits] Update result - data:", updateData, "error:", error);

    if (error) {
      console.error("[deductCredits] Failed to deduct credits:", error);
      return {
        success: false,
        newBalance: currentCredits,
        error: "Failed to deduct credits. Please try again."
      };
    }

    // Check if the update actually affected any rows
    if (!updateData || updateData.length === 0) {
      console.error("[deductCredits] No rows were updated. User might not exist in user_credits table.");
      return {
        success: false,
        newBalance: currentCredits,
        error: "User not found in credits system. Please contact support."
      };
    }

    // Verify the update by querying the database again
    const verifyCredits = await getUserCredits(userId);
    console.log(`[deductCredits] Verification - credits in database after update: ${verifyCredits}`);
    
    if (verifyCredits !== newBalance) {
      console.error(`[deductCredits] Database verification failed! Expected: ${newBalance}, Got: ${verifyCredits}`);
      return {
        success: false,
        newBalance: currentCredits,
        error: "Credit deduction failed. Database update did not persist."
      };
    }

    console.log(`[deductCredits] Successfully deducted ${amount} credits. New balance: ${newBalance}`);
    return {
      success: true,
      newBalance: newBalance
    };
  } catch (error) {
    console.error("[deductCredits] Error deducting credits:", error);
    return {
      success: false,
      newBalance: 0,
      error: "An unexpected error occurred while deducting credits."
    };
  }
}

export async function addCredits(userId: string, amount: number): Promise<{ success: boolean; newBalance: number; error?: string }> {
  try {
    // First, get current credits
    const currentCredits = await getUserCredits(userId);
    const newBalance = currentCredits + amount;

    // Update credits in database
    const { error } = await supabase
      .from("user_credits")
      .update({ credits: newBalance })
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to add credits:", error);
      return {
        success: false,
        newBalance: currentCredits,
        error: "Failed to add credits. Please try again."
      };
    }

    return {
      success: true,
      newBalance: newBalance
    };
  } catch (error) {
    console.error("Error adding credits:", error);
    return {
      success: false,
      newBalance: 0,
      error: "An unexpected error occurred while adding credits."
    };
  }
}
  