-- Add missing tables for payments and activity logging
-- Run this in your Supabase SQL editor

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(255) PRIMARY KEY,
  external_id VARCHAR(255),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'PHP',
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  provider VARCHAR(50) NOT NULL DEFAULT 'xendit',
  metadata JSONB DEFAULT '{}',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) DEFAULT 0,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_external_id ON payments(external_id);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_type ON activity_log(type);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at);

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at 
  BEFORE UPDATE ON payments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
-- Users can only see their own payments
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can insert payments (for webhooks)
DROP POLICY IF EXISTS "Service role can insert payments" ON payments;
CREATE POLICY "Service role can insert payments" ON payments
  FOR INSERT WITH CHECK (true);

-- Service role can update payments (for webhooks)
DROP POLICY IF EXISTS "Service role can update payments" ON payments;
CREATE POLICY "Service role can update payments" ON payments
  FOR UPDATE USING (true);

-- Create RLS policies for activity_log
-- Users can only see their own activity
DROP POLICY IF EXISTS "Users can view own activity" ON activity_log;
CREATE POLICY "Users can view own activity" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can insert activity (for webhooks)
DROP POLICY IF EXISTS "Service role can insert activity" ON activity_log;
CREATE POLICY "Service role can insert activity" ON activity_log
  FOR INSERT WITH CHECK (true);

-- Admin users can view all payments and activity
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can view all activity" ON activity_log;
CREATE POLICY "Admins can view all activity" ON activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
