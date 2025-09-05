// Quick script to check user credits in Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCredits() {
  try {
    // Replace 'your-user-id' with your actual user ID
    const userId = 'your-user-id'; // You need to replace this
    
    console.log(`Checking credits for user: ${userId}`);
    
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching credits:', error);
      return;
    }
    
    console.log('Current credits:', data);
    
    // Also check recent payments
    const { data: payments, error: payError } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (payError) {
      console.error('Error fetching payments:', payError);
      return;
    }
    
    console.log('Recent payments:', payments);
    
  } catch (err) {
    console.error('Script error:', err);
  }
}

checkCredits();
