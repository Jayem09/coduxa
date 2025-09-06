import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function resetDatabase() {
  console.log('🔄 Starting database reset...');
  
  try {
    // 1. Clear all payment records
    console.log('📊 Clearing payment records...');
    const { error: paymentsError } = await supabase
      .from('payments')
      .delete()
      .neq('id', 0); // Delete all records
    if (paymentsError) throw paymentsError;
    console.log('✅ Payment records cleared');

    // 2. Clear all activity logs
    console.log('📝 Clearing activity logs...');
    const { error: activityError } = await supabase
      .from('activity_log')
      .delete()
      .neq('id', 0); // Delete all records
    if (activityError) throw activityError;
    console.log('✅ Activity logs cleared');

    // 3. Reset all user credits to 0
    console.log('💰 Resetting user credits...');
    const { error: creditsError } = await supabase
      .from('user_credits')
      .update({ credits: 0 })
      .gte('credits', 0); // Add WHERE clause - update all records where credits >= 0
    if (creditsError) throw creditsError;
    console.log('✅ User credits reset to 0');

    // 4. Verify the reset
    console.log('🔍 Verifying reset...');
    
    const { data: paymentsCount } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true });
    
    const { data: activityCount } = await supabase
      .from('activity_log')
      .select('*', { count: 'exact', head: true });
    
    const { data: creditsData } = await supabase
      .from('user_credits')
      .select('credits');
    
    const totalCredits = creditsData?.reduce((sum, row) => sum + (row.credits || 0), 0) || 0;

    console.log('\n📊 Reset Summary:');
    console.log(`   Payments: ${paymentsCount?.length || 0} records`);
    console.log(`   Activity Logs: ${activityCount?.length || 0} records`);
    console.log(`   Total Credits: ${totalCredits}`);
    
    console.log('\n🎉 Database reset completed successfully!');
    console.log('💡 Your admin dashboard will now show:');
    console.log('   - Total Revenue: ₱0.00');
    console.log('   - Average Transaction: ₱0.00');
    console.log('   - Transactions Today: 0');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

// Run the reset
resetDatabase();
