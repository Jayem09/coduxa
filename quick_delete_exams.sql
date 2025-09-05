-- Quick Delete Exam Records
-- Run these in your Supabase SQL editor

-- 1. View current exam results
SELECT 
  id,
  user_id,
  exam_id,
  exam_title,
  score,
  passed,
  created_at
FROM exam_results 
ORDER BY created_at DESC
LIMIT 10;

-- 2. View current certificates
SELECT 
  id,
  certificate_id,
  user_id,
  exam_title,
  score,
  created_at
FROM certificates 
ORDER BY created_at DESC
LIMIT 10;

-- 3. Delete ALL exam results and certificates (DANGEROUS!)
-- DELETE FROM certificates;
-- DELETE FROM exam_results;

-- 4. Delete exam results for a specific user (replace with actual user ID)
-- DELETE FROM exam_results WHERE user_id = '65c4ee04-15af-4e8f-a6ab-26dcb6c7b8c7';

-- 5. Delete exam results for a specific exam type
-- DELETE FROM exam_results WHERE exam_id = 'js-fundamentals';

-- 6. Delete failed exams only
-- DELETE FROM exam_results WHERE passed = false;

-- 7. Delete exams older than 30 days
-- DELETE FROM exam_results WHERE created_at < NOW() - INTERVAL '30 days';

-- 8. Delete exams with low scores (below 50%)
-- DELETE FROM exam_results WHERE (score::float / max_score::float) < 0.5;

-- 9. Count remaining records
SELECT 
  COUNT(*) as exam_results_count
FROM exam_results;

SELECT 
  COUNT(*) as certificates_count
FROM certificates;
