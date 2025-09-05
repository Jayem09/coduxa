-- Check existing exam data in your database
-- Run this in your Supabase SQL editor to see what data exists

-- Check if there are any exam results
SELECT COUNT(*) as total_exam_results FROM exam_results;

-- Check if there are any profiles
SELECT COUNT(*) as total_profiles FROM profiles;

-- Check recent exam results (if any exist)
SELECT 
  er.id,
  er.user_id,
  er.exam_title,
  er.score,
  er.passed,
  er.created_at,
  p.email,
  p.full_name
FROM exam_results er
LEFT JOIN profiles p ON er.user_id = p.id
ORDER BY er.created_at DESC
LIMIT 10;

-- Check if RLS policies are blocking access
-- This will show if the current user can see exam results
SELECT 
  'Current user can see ' || COUNT(*) || ' exam results' as access_info
FROM exam_results;

-- Check user profiles access
SELECT 
  'Current user can see ' || COUNT(*) || ' profiles' as access_info
FROM profiles;
