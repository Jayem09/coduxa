# Email Customization Guide for Coduxa

## How to Change Email Sender from "Supabase" to "Coduxa"

### Method 1: Supabase Dashboard - Authentication Settings

1. **Go to your Supabase Dashboard**

   - Visit: https://supabase.com/dashboard
   - Select your Coduxa project

2. **Navigate to Authentication Settings**

   - Go to: **Authentication → Settings**
   - Look for these sections:
     - **"Email"** section
     - **"SMTP Settings"** section
     - **"Email Templates"** section (if available)

3. **Configure Custom SMTP (Recommended)**

   - Enable "Enable custom SMTP"
   - This allows you to use your own email service
   - Set custom sender name and domain

4. **Alternative: Look for Email Configuration**
   - Some Supabase projects have email settings under:
     - **Authentication → Email**
     - **Authentication → Templates**
     - **Settings → Email**

#### Password Reset Email Template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Reset Your Coduxa Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; margin: 0;">Coduxa</h1>
        <p style="color: #666; margin: 5px 0;">
          Programming Certification Platform
        </p>
      </div>

      <h2 style="color: #333;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>
        We received a request to reset your password for your Coduxa account.
        Click the button below to reset your password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{ .ConfirmationURL }}"
          style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;"
        >
          Reset Password
        </a>
      </div>

      <p>
        If you didn't request this password reset, you can safely ignore this
        email.
      </p>
      <p>This link will expire in 24 hours.</p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #666; font-size: 14px;">
        Best regards,<br />
        The Coduxa Team<br />
        <a href="https://coduxa.com" style="color: #3b82f6;">coduxa.com</a>
      </p>
    </div>
  </body>
</html>
```

#### Email Confirmation Template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Welcome to Coduxa</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; margin: 0;">Welcome to Coduxa!</h1>
        <p style="color: #666; margin: 5px 0;">
          Programming Certification Platform
        </p>
      </div>

      <h2 style="color: #333;">Confirm Your Email</h2>
      <p>Hello,</p>
      <p>
        Thank you for signing up for Coduxa! Please confirm your email address
        by clicking the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{ .ConfirmationURL }}"
          style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;"
        >
          Confirm Email
        </a>
      </div>

      <p>
        Once confirmed, you'll be able to access all Coduxa features and start
        your programming certification journey!
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #666; font-size: 14px;">
        Best regards,<br />
        The Coduxa Team<br />
        <a href="https://coduxa.com" style="color: #3b82f6;">coduxa.com</a>
      </p>
    </div>
  </body>
</html>
```

### Method 2: Custom SMTP Configuration (When Templates Not Available)

If email templates are not available in your Supabase dashboard, use custom SMTP:

1. **Set up your own SMTP server** (Gmail, SendGrid, Mailgun, etc.)
2. **Configure in Supabase Dashboard**:
   - Go to **Authentication → Settings**
   - Scroll to **"SMTP Settings"** section
   - Enable **"Enable custom SMTP"**
   - Enter your SMTP credentials

### Method 3: Alternative Email Service Integration

If Supabase email customization is limited, integrate a third-party service:

1. **Use SendGrid, Mailgun, or Resend**
2. **Replace Supabase email calls** with your service
3. **Customize sender name and templates** completely

#### Example SMTP Configuration:

```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: your-email@gmail.com
SMTP Pass: your-app-password
SMTP Admin Email: your-email@gmail.com
SMTP Sender Name: Coduxa
```

### Method 3: Programmatic Configuration (Advanced)

You can also configure email settings programmatically using the Supabase Management API.

## Important Notes:

1. **Sender Name**: The sender name will show as "Coduxa" instead of "Supabase"
2. **Email Templates**: Customize the HTML templates with your branding
3. **Domain**: Consider using a custom domain for emails (e.g., noreply@coduxa.com)
4. **Testing**: Always test email templates before deploying

## Next Steps:

1. Go to your Supabase Dashboard
2. Navigate to Authentication → Email Templates
3. Replace the default templates with the custom ones above
4. Test the password reset flow
5. Verify emails show "Coduxa" as the sender

This will make your emails look professional and branded for your Coduxa platform!
