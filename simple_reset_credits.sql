-- Simple Credit Reset Queries
-- Run these in your Supabase SQL editor

-- 1. Reset ALL user credits to 0
UPDATE user_credits SET credits = 0;

-- 2. Reset credits for a specific user (replace 'USER_ID_HERE' with actual user ID)
-- UPDATE user_credits SET credits = 0 WHERE user_id = 'USER_ID_HERE';

-- 3. Reset credits for multiple specific users
-- UPDATE user_credits SET credits = 0 WHERE user_id IN ('USER_ID_1', 'USER_ID_2', 'USER_ID_3');

-- 4. Delete all credit records (more drastic - removes the records entirely)
-- DELETE FROM user_credits;

-- 5. Delete credit records for a specific user
-- DELETE FROM user_credits WHERE user_id = 'USER_ID_HERE';

-- 6. Add credits to all users (example: give everyone 100 credits)
-- UPDATE user_credits SET credits = 100;

-- 7. Add credits to a specific user
-- UPDATE user_credits SET credits = credits + 50 WHERE user_id = 'USER_ID_HERE';

-- 8. View all user credits (works with or without created_at/updated_at columns)
-- SELECT user_id, credits 
-- FROM user_credits 
-- ORDER BY user_id;

-- 9. View credits for a specific user
-- SELECT user_id, credits 
-- FROM user_credits 
-- WHERE user_id = 'USER_ID_HERE';

-- 10. Check if user_credits table exists and has data
-- SELECT COUNT(*) as total_users, SUM(credits) as total_credits FROM user_credits;
