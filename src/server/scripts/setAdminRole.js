import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Usage:
//   node src/server/scripts/setAdminRole.js --id <USER_ID>
//   node src/server/scripts/setAdminRole.js --email <EMAIL>

async function main() {
  const args = process.argv.slice(2);
  const idIndex = args.indexOf('--id');
  const emailIndex = args.indexOf('--email');

  const userId = idIndex !== -1 ? args[idIndex + 1] : undefined;
  // Default admin email for convenience
  const defaultEmail = 'johndinglasan12@gmail.com';
  const email = emailIndex !== -1 ? args[emailIndex + 1] : defaultEmail;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
    process.exit(1);
  }

  // If neither provided, we'll use defaultEmail above

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  let targetId = userId;
  if (!targetId && email) {
    // Look up user by email via admin API
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      console.error('Failed to list users:', error);
      process.exit(1);
    }
    const found = data.users.find(u => u.email === email);
    if (!found) {
      console.error('User not found for email:', email);
      process.exit(1);
    }
    targetId = found.id;
  }

  const { data: updated, error: updateErr } = await supabase.auth.admin.updateUserById(targetId, {
    app_metadata: { role: 'admin' },
  });

  if (updateErr) {
    console.error('Failed to set role:', updateErr);
    process.exit(1);
  }

  console.log('✅ Updated user to admin:', { id: updated.user.id, email: updated.user.email, app_metadata: updated.user.app_metadata });
  console.log('Note: Sign out and sign back in so a new JWT is issued with role=admin.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


