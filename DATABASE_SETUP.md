# Database Setup Guide

## Step 1: Set up Supabase Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the following SQL script:

```sql
-- Database schema for exam results and certificates
-- Run this in your Supabase SQL editor

-- Create exam_results table
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id VARCHAR(255) NOT NULL,
  exam_title VARCHAR(500) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  time_spent INTEGER NOT NULL, -- in minutes
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT false,
  answers JSONB NOT NULL DEFAULT '{}',
  questions JSONB NOT NULL DEFAULT '[]',
  certificate_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id VARCHAR(255) UNIQUE NOT NULL,
  exam_result_id UUID REFERENCES exam_results(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_title VARCHAR(500) NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  completion_date TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE,
  skills JSONB DEFAULT '[]',
  verification_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_exam_id ON exam_results(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_passed ON exam_results(passed);
CREATE INDEX IF NOT EXISTS idx_exam_results_created_at ON exam_results(created_at);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON certificates(certificate_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_exam_results_updated_at
  BEFORE UPDATE ON exam_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own exam results
CREATE POLICY "Users can view own exam results" ON exam_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam results" ON exam_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam results" ON exam_results
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own certificates
CREATE POLICY "Users can view own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates" ON certificates
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own certificates" ON certificates
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for certificate verification
CREATE POLICY "Public can verify certificates" ON certificates
  FOR SELECT USING (true);
```

4. Click "Run" to execute the script

## Step 2: Insert Test Data (Optional)

If you want to test with some sample data, run this after the above:

```sql
-- Insert a test profile (replace with your actual user ID)
INSERT INTO profiles (id, email, full_name)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'test@coduxa.com', 'Test User')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name;

-- Insert a sample exam result
INSERT INTO exam_results (
  user_id,
  exam_id,
  exam_title,
  start_time,
  end_time,
  time_spent,
  score,
  max_score,
  passed,
  answers,
  questions,
  certificate_id
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'javascript-basics',
  'JavaScript Fundamentals',
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '45 minutes',
  45,
  85,
  100,
  true,
  '{"q1": "A", "q2": "B", "q3": "C"}',
  '[{"id": "q1", "title": "What is JavaScript?", "points": 10}, {"id": "q2", "title": "What is a variable?", "points": 10}, {"id": "q3", "title": "What is a function?", "points": 10}]',
  'CERT-JAVASCRIPT-BASICS-0000-ABC123'
);
```

## Step 3: Update Authentication (For Production)

In production, you'll need to:

1. Replace the mock UUID `'550e8400-e29b-41d4-a716-446655440000'` with actual user authentication
2. Get the current user ID from your auth system (Supabase Auth, Firebase, etc.)
3. Update the user ID in both `CertificationsPage.tsx` and `ExamsPage.tsx`

## Step 4: Test the System

1. Start your development server: `npm run dev`
2. Navigate to the Certifications page
3. The system should now load real data from the database
4. Take an exam and see the results saved to the database
5. View and download certificates with real exam data

## Troubleshooting

- If you get "table not found" errors, make sure you ran the SQL script in Step 1
- If you get "invalid UUID" errors, make sure you're using proper UUID format
- If you get permission errors, check that RLS policies are set up correctly
- For testing, you can temporarily disable RLS by running: `ALTER TABLE exam_results DISABLE ROW LEVEL SECURITY;`
