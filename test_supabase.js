// Test script to check Supabase connection and RPC function
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test RPC function
    console.log('Testing increment_credits RPC function...');
    const rpcResult = await supabase.rpc("increment_credits", {
      p_user_id: "test-user-id",
      p_credit_amount: 1,
    });
    
    if (rpcResult.error) {
      console.error('❌ RPC function error:', rpcResult.error);
      console.log('RPC function might not exist or have wrong parameters');
    } else {
      console.log('✅ RPC function exists and works');
    }
    
  } catch (err) {
    console.error('Test error:', err);
  }
}

testSupabase();
