-- Create the increment_credits RPC function in Supabase
-- Run this in your Supabase SQL editor

CREATE OR REPLACE FUNCTION increment_credits(
  p_user_id TEXT,
  p_credit_amount INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  new_credits INTEGER;
  result JSON;
BEGIN
  -- Get current credits
  SELECT COALESCE(credits, 0) INTO current_credits
  FROM user_credits
  WHERE user_id = p_user_id;
  
  -- If user doesn't exist, create them with 0 credits
  IF current_credits IS NULL THEN
    INSERT INTO user_credits (user_id, credits)
    VALUES (p_user_id, 0);
    current_credits := 0;
  END IF;
  
  -- Calculate new credits
  new_credits := current_credits + p_credit_amount;
  
  -- Update credits
  UPDATE user_credits
  SET credits = new_credits
  WHERE user_id = p_user_id;
  
  -- Return result
  result := json_build_object(
    'success', true,
    'old_credits', current_credits,
    'new_credits', new_credits,
    'added_credits', p_credit_amount
  );
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;
