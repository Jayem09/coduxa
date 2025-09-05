-- Fix user_credits table structure
-- Run this in your Supabase SQL editor

-- 1. First, check the current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_credits'
ORDER BY ordinal_position;

-- 2. Add missing columns if they don't exist
DO $$
BEGIN
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_credits' AND column_name = 'created_at') THEN
        ALTER TABLE user_credits ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_credits' AND column_name = 'updated_at') THEN
        ALTER TABLE user_credits ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END
$$;

-- 3. Create the update trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Create the trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_credits_updated_at') THEN
        CREATE TRIGGER update_user_credits_updated_at 
          BEFORE UPDATE ON user_credits 
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END
$$;

-- 5. Enable RLS if not already enabled
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_credits' AND policyname = 'Users can view own credits') THEN
        CREATE POLICY "Users can view own credits" ON user_credits
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_credits' AND policyname = 'Users can insert own credits') THEN
        CREATE POLICY "Users can insert own credits" ON user_credits
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_credits' AND policyname = 'Users can update own credits') THEN
        CREATE POLICY "Users can update own credits" ON user_credits
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- 7. Check the final table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_credits'
ORDER BY ordinal_position;

-- 8. View current data
SELECT user_id, credits, created_at, updated_at 
FROM user_credits 
ORDER BY created_at DESC;
