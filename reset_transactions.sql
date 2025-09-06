-- Reset all transactions and related data for fresh deployment
-- This will clear all payment records, activity logs, and reset user credits

-- 1. Clear all payment records
DELETE FROM payments;

-- 2. Clear all activity logs
DELETE FROM activity_log;

-- 3. Reset all user credits to 0
UPDATE user_credits SET credits = 0;

-- 4. Clear any exam results (optional - uncomment if needed)
-- DELETE FROM exam_results;

-- 5. Clear any earned certifications (optional - uncomment if needed)
-- DELETE FROM earned_certifications;

-- Verify the reset
SELECT 
  'payments' as table_name, 
  COUNT(*) as remaining_records 
FROM payments
UNION ALL
SELECT 
  'activity_log' as table_name, 
  COUNT(*) as remaining_records 
FROM activity_log
UNION ALL
SELECT 
  'user_credits' as table_name, 
  COUNT(*) as remaining_records,
  SUM(credits) as total_credits
FROM user_credits;
