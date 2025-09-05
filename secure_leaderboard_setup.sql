-- Secure leaderboard setup with limited data exposure
-- Run this in your Supabase SQL editor

-- Create a view for leaderboard data that only exposes necessary information
CREATE OR REPLACE VIEW leaderboard_data AS
SELECT 
  p.id as user_id,
  p.email,
  COALESCE(p.full_name, SPLIT_PART(p.email, '@', 1)) as username,
  p.created_at as join_date,
  COUNT(er.id) as exams_completed,
  SUM(er.score) as total_score,
  AVG(er.score) as average_score,
  COUNT(CASE WHEN er.passed = true THEN 1 END) as certifications_earned,
  MAX(er.created_at) as last_active
FROM profiles p
LEFT JOIN exam_results er ON p.id = er.user_id
GROUP BY p.id, p.email, p.full_name, p.created_at
HAVING COUNT(er.id) > 0  -- Only include users who have taken exams
ORDER BY total_score DESC;

-- Create a view for leaderboard stats
CREATE OR REPLACE VIEW leaderboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM exam_results) as total_exams,
  (SELECT COUNT(*) FROM exam_results WHERE passed = true) as total_certifications,
  (SELECT AVG(score) FROM exam_results) as average_score;

-- Grant public access to these views
GRANT SELECT ON leaderboard_data TO anon, authenticated;
GRANT SELECT ON leaderboard_stats TO anon, authenticated;

-- Keep the original tables with restrictive RLS policies
-- (Don't run the fix_leaderboard_rls.sql if you use this approach)

-- Alternative: Create a function that returns leaderboard data
CREATE OR REPLACE FUNCTION get_leaderboard_data()
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  email TEXT,
  total_score BIGINT,
  exams_completed BIGINT,
  average_score NUMERIC,
  certifications_earned BIGINT,
  last_active TIMESTAMP WITH TIME ZONE,
  join_date TIMESTAMP WITH TIME ZONE
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    p.id as user_id,
    COALESCE(p.full_name, SPLIT_PART(p.email, '@', 1)) as username,
    p.email,
    COALESCE(SUM(er.score), 0) as total_score,
    COUNT(er.id) as exams_completed,
    COALESCE(AVG(er.score), 0) as average_score,
    COUNT(CASE WHEN er.passed = true THEN 1 END) as certifications_earned,
    MAX(er.created_at) as last_active,
    p.created_at as join_date
  FROM profiles p
  LEFT JOIN exam_results er ON p.id = er.user_id
  GROUP BY p.id, p.email, p.full_name, p.created_at
  HAVING COUNT(er.id) > 0
  ORDER BY total_score DESC
  LIMIT 50;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_leaderboard_data() TO anon, authenticated;
