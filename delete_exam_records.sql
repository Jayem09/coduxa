-- Delete Exam Records Queries
-- Run these in your Supabase SQL editor

-- 1. View all exam results (to see what you have)
SELECT 
  id,
  user_id,
  exam_id,
  exam_title,
  start_time,
  end_time,
  score,
  max_score,
  passed,
  created_at
FROM exam_results 
ORDER BY created_at DESC;

-- 2. View all certificates (to see what you have)
SELECT 
  id,
  certificate_id,
  exam_result_id,
  user_id,
  exam_title,
  score,
  max_score,
  completion_date,
  created_at
FROM certificates 
ORDER BY created_at DESC;

-- 3. Delete ALL exam results and certificates (DANGEROUS - removes everything)
-- DELETE FROM certificates;
-- DELETE FROM exam_results;

-- 4. Delete exam results for a specific user (replace 'USER_ID_HERE' with actual user ID)
-- DELETE FROM exam_results WHERE user_id = 'USER_ID_HERE';

-- 5. Delete exam results for multiple specific users
-- DELETE FROM exam_results WHERE user_id IN ('USER_ID_1', 'USER_ID_2', 'USER_ID_3');

-- 6. Delete a specific exam result by ID (replace 'EXAM_RESULT_ID_HERE' with actual ID)
-- DELETE FROM exam_results WHERE id = 'EXAM_RESULT_ID_HERE';

-- 7. Delete exam results for a specific exam type (e.g., all JavaScript exams)
-- DELETE FROM exam_results WHERE exam_id = 'js-fundamentals';

-- 8. Delete exam results older than a specific date
-- DELETE FROM exam_results WHERE created_at < '2024-01-01';

-- 9. Delete failed exam results only
-- DELETE FROM exam_results WHERE passed = false;

-- 10. Delete exam results with score below a threshold
-- DELETE FROM exam_results WHERE score < 50;

-- 11. Delete certificates for a specific user
-- DELETE FROM certificates WHERE user_id = 'USER_ID_HERE';

-- 12. Delete a specific certificate by ID
-- DELETE FROM certificates WHERE id = 'CERTIFICATE_ID_HERE';

-- 13. Delete certificates for a specific exam result
-- DELETE FROM certificates WHERE exam_result_id = 'EXAM_RESULT_ID_HERE';

-- 14. Delete certificates for a specific exam type
-- DELETE FROM certificates WHERE exam_id = 'js-fundamentals';

-- 15. Delete certificates older than a specific date
-- DELETE FROM certificates WHERE created_at < '2024-01-01';

-- 16. Delete certificates with score below a threshold
-- DELETE FROM certificates WHERE score < 50;

-- 17. Delete exam results and their associated certificates (cascade delete)
-- This will automatically delete certificates when exam_results are deleted due to foreign key constraint
-- DELETE FROM exam_results WHERE user_id = 'USER_ID_HERE';

-- 18. Count remaining records after deletion
-- SELECT 
--   (SELECT COUNT(*) FROM exam_results) as exam_results_count,
--   (SELECT COUNT(*) FROM certificates) as certificates_count;

-- 19. View exam results for a specific user (to verify deletion)
-- SELECT 
--   id,
--   exam_id,
--   exam_title,
--   score,
--   max_score,
--   passed,
--   created_at
-- FROM exam_results 
-- WHERE user_id = 'USER_ID_HERE'
-- ORDER BY created_at DESC;

-- 20. View certificates for a specific user (to verify deletion)
-- SELECT 
--   id,
--   certificate_id,
--   exam_title,
--   score,
--   max_score,
--   completion_date
-- FROM certificates 
-- WHERE user_id = 'USER_ID_HERE'
-- ORDER BY created_at DESC;
