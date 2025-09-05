# Feedback System Setup Guide

This guide will help you set up the feedback system in your Coduxa platform.

## Prerequisites

- Supabase project with admin access
- Coduxa platform running locally or deployed
- Database access to run SQL scripts

## Step 1: Database Setup

### 1.1 Run the Schema Script

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `feedback_schema.sql`
4. Execute the script

This will create:
- `feedback` table for storing user feedback
- `feedback_responses` table for admin responses
- Proper indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic timestamp updates

### 1.2 Verify Tables Created

Run this query to verify the tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('feedback', 'feedback_responses');
```

### 1.3 Check RLS Policies

Verify the RLS policies are active:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('feedback', 'feedback_responses');
```

## Step 2: Component Integration

### 2.1 Verify Files Are in Place

Ensure these files exist in your project:

```
src/
├── components/
│   ├── Feedback.tsx
│   ├── pages/
│   │   └── FeedbackPage.tsx
│   └── __tests__/
│       ├── Feedback.test.tsx
│       └── Feedback.simple.test.tsx
├── services/
│   └── feedbackService.ts
└── App.tsx (updated with feedback route)
```

### 2.2 Check Routing Configuration

Verify the feedback route is added to `App.tsx`:

```tsx
<Route path="feedback" element={
  <>
    <SEO {...seoConfigs.feedback} />
    <Feedback />
  </>
} />
```

### 2.3 Verify SEO Configuration

Check that `SEO.tsx` includes the feedback configuration:

```tsx
feedback: {
  title: 'Feedback Center - Share Your Thoughts',
  description: 'Share your feedback, report bugs, suggest features, and help us improve Coduxa.',
  keywords: 'feedback, bug report, feature request, improvement suggestions',
  url: '/dashboard/feedback',
}
```

## Step 3: Test the Implementation

### 3.1 Run the Development Server

```bash
cd coduxa-platform
npm run dev
```

### 3.2 Navigate to Feedback Page

1. Open your browser to `http://localhost:5174/dashboard/feedback`
2. You should see the Feedback Center page

### 3.3 Test Feedback Submission

1. Click on "Send Feedback" tab
2. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Feedback
   - Message: This is a test feedback message
   - Category: General
   - Priority: Medium
   - Rating: 5 stars
3. Click "Submit Feedback"
4. You should see a success message and be redirected to the "View Feedback" tab

### 3.4 Test Feedback Display

1. In the "View Feedback" tab, you should see your submitted feedback
2. Test the search functionality
3. Test the filtering options
4. Verify the statistics cards show correct data

## Step 4: Run Tests

### 4.1 Run Unit Tests

```bash
npm run test:run -- src/components/__tests__/Feedback.simple.test.tsx
```

### 4.2 Run All Feedback Tests

```bash
npm run test:run -- src/components/__tests__/Feedback.test.tsx
```

## Step 5: Admin Features (Optional)

### 5.1 Admin Dashboard Integration

If you want to add feedback management to the admin dashboard:

1. Create an admin feedback management component
2. Add it to the admin dashboard
3. Implement feedback status updates
4. Add response functionality

### 5.2 Email Notifications (Future)

Consider implementing email notifications for:
- New feedback submissions
- Status updates
- Admin responses

## Troubleshooting

### Common Issues

#### 1. "Failed to load feedback data" Error

**Cause**: RLS policies are too restrictive or tables don't exist

**Solution**:
1. Check if tables exist in your database
2. Verify RLS policies are correctly set up
3. Ensure your user has proper permissions

#### 2. Form Submission Fails

**Cause**: Service method errors or network issues

**Solution**:
1. Check browser console for errors
2. Verify Supabase connection
3. Check if user is authenticated (for user-specific feedback)

#### 3. Statistics Not Loading

**Cause**: No data in the feedback table or service errors

**Solution**:
1. Submit some test feedback first
2. Check the `getFeedbackStats` method
3. Verify database queries are working

#### 4. Search/Filter Not Working

**Cause**: JavaScript errors or state management issues

**Solution**:
1. Check browser console for errors
2. Verify the filtering logic in the component
3. Test with different search terms

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem('debug', 'feedback:*');
```

## Database Queries for Testing

### Check Feedback Data

```sql
SELECT * FROM feedback ORDER BY created_at DESC LIMIT 10;
```

### Check Feedback Stats

```sql
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
  AVG(rating) as avg_rating
FROM feedback;
```

### Check RLS Policies

```sql
SELECT * FROM pg_policies WHERE tablename = 'feedback';
```

## Security Considerations

### 1. Input Validation

The component includes basic client-side validation, but consider adding server-side validation:

```sql
-- Add constraints to the feedback table
ALTER TABLE feedback 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE feedback 
ADD CONSTRAINT check_rating_range 
CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));
```

### 2. Rate Limiting

Consider implementing rate limiting to prevent spam:

```sql
-- Create a function to check rate limits
CREATE OR REPLACE FUNCTION check_feedback_rate_limit(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM feedback 
    WHERE email = user_email 
    AND created_at > NOW() - INTERVAL '1 hour'
  );
END;
$$ LANGUAGE plpgsql;
```

### 3. Data Retention

Consider implementing data retention policies:

```sql
-- Create a function to clean old feedback
CREATE OR REPLACE FUNCTION cleanup_old_feedback()
RETURNS VOID AS $$
BEGIN
  DELETE FROM feedback 
  WHERE status = 'closed' 
  AND created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;
```

## Performance Optimization

### 1. Database Indexes

The schema includes basic indexes, but you might want to add more:

```sql
-- Add composite index for common queries
CREATE INDEX IF NOT EXISTS idx_feedback_status_category 
ON feedback(status, category);

-- Add index for search functionality
CREATE INDEX IF NOT EXISTS idx_feedback_search 
ON feedback USING gin(to_tsvector('english', subject || ' ' || message));
```

### 2. Pagination

For large datasets, implement proper pagination:

```sql
-- Example pagination query
SELECT * FROM feedback 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 0;
```

## Monitoring and Analytics

### 1. Track Feedback Metrics

```sql
-- Daily feedback count
SELECT 
  DATE(created_at) as date,
  COUNT(*) as feedback_count,
  COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_count
FROM feedback 
GROUP BY DATE(created_at) 
ORDER BY date DESC;
```

### 2. Category Distribution

```sql
-- Feedback by category
SELECT 
  category,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM feedback 
GROUP BY category 
ORDER BY count DESC;
```

## Support

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Verify database connectivity and permissions
3. Review the RLS policies
4. Test with a fresh database setup
5. Check the component documentation in `Feedback_README.md`

## Next Steps

After successful setup:

1. **Customize the UI** to match your brand
2. **Add admin features** for feedback management
3. **Implement email notifications**
4. **Add analytics and reporting**
5. **Consider integration** with external tools
6. **Set up monitoring** and alerting
