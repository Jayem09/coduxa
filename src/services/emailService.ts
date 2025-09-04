// Custom Email Service for Coduxa
// This allows you to send branded emails instead of using Supabase's default emails

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Email templates
export const emailTemplates = {
  passwordReset: (resetUrl: string, userEmail: string) => ({
    subject: 'Reset Your Coduxa Password',
    html: `
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
              <p style="color: #666; margin: 5px 0;">Programming Certification Platform</p>
            </div>
            
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password for your Coduxa account. Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p>If you didn't request this password reset, you can safely ignore this email.</p>
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
    `
  }),

  emailConfirmation: (confirmUrl: string, userEmail: string) => ({
    subject: 'Welcome to Coduxa - Confirm Your Email',
    html: `
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
              <p style="color: #666; margin: 5px 0;">Programming Certification Platform</p>
            </div>
            
            <h2 style="color: #333;">Confirm Your Email</h2>
            <p>Hello,</p>
            <p>Thank you for signing up for Coduxa! Please confirm your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" 
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Confirm Email
              </a>
            </div>
            
            <p>Once confirmed, you'll be able to access all Coduxa features and start your programming certification journey!</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #666; font-size: 14px;">
              Best regards,<br />
              The Coduxa Team<br />
              <a href="https://coduxa.com" style="color: #3b82f6;">coduxa.com</a>
            </p>
          </div>
        </body>
      </html>
    `
  })
};

// Email service class
export class EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor(apiKey: string, fromEmail: string = 'noreply@coduxa.com') {
    this.apiKey = apiKey;
    this.fromEmail = fromEmail;
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    try {
      // Example using Resend (you can replace with SendGrid, Mailgun, etc.)
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: options.from || this.fromEmail,
          to: options.to,
          subject: options.subject,
          html: options.html,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `Email service error: ${error}` };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<{ success: boolean; error?: string }> {
    const template = emailTemplates.passwordReset(resetUrl, email);
    return this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendEmailConfirmation(email: string, confirmUrl: string): Promise<{ success: boolean; error?: string }> {
    const template = emailTemplates.emailConfirmation(confirmUrl, email);
    return this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
  }
}

// Initialize email service (you'll need to add your API key)
export const emailService = new EmailService(
  process.env.REACT_APP_EMAIL_API_KEY || '', // Add your email service API key
  'noreply@coduxa.com' // Your custom sender email
);
