-- Fix RLS policies for leaderboard functionality
-- Run this in your Supabase SQL editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own exam results" ON exam_results;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create new policies that allow leaderboard access
-- Allow public read access to exam results for leaderboard (aggregated data only)
CREATE POLICY "Public can view exam results for leaderboard" ON exam_results
  FOR SELECT USING (true);

-- Allow public read access to profiles for leaderboard (username/email only)
CREATE POLICY "Public can view profiles for leaderboard" ON profiles
  FOR SELECT USING (true);

-- Keep the insert/update policies restrictive for security
-- Users can still only insert/update their own data
CREATE POLICY "Users can insert own exam results" ON exam_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam results" ON exam_results
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Optional: Create a more restrictive policy if you want to limit what data is visible
-- Uncomment the following if you want to hide sensitive information:

-- CREATE POLICY "Public can view limited exam results for leaderboard" ON exam_results
--   FOR SELECT USING (true);

-- CREATE POLICY "Public can view limited profiles for leaderboard" ON profiles
--   FOR SELECT USING (true);

-- Note: This allows the leaderboard to work but makes all exam results and profile data publicly readable.
-- If you need more security, consider creating a view or function that only exposes necessary data.
