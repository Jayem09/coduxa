/**
 * Simple Email Confirmation Tests
 * Tests the email confirmation endpoint functionality
 */

import request from 'supertest';
import express from 'express';

// Create a simple test app
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  // Mock Resend for testing
  const mockResend = {
    emails: {
      send: jest.fn()
    }
  };

  // Email confirmation endpoint
  app.post("/api/send-confirmation", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const result = await mockResend.emails.send({
        from: "noreply@coduxa.com",
        to: email,
        subject: "Welcome to Coduxa - Confirm Your Email",
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
                  <a href="${process.env.FRONTEND_URL || 'https://coduxa.vercel.app'}/confirm?email=${encodeURIComponent(email)}" 
                     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    Confirm Email
                  </a>
                </div>
                
                <p>Once confirmed, you'll be able to access all Coduxa features and start your programming certification journey!</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="color: #666; font-size: 14px;">
                  Best regards,<br />
                  The Coduxa Team<br />
                  <a href="https://coduxa.vercel.app" style="color: #3b82f6;">coduxa.vercel.app</a>
                </p>
              </div>
            </body>
          </html>
        `,
      });

      res.json({ success: true, result });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  return { app, mockResend };
};

describe('Email Confirmation Endpoint - Simple Tests', () => {
  let app;
  let mockResend;

  beforeEach(() => {
    const testSetup = createTestApp();
    app = testSetup.app;
    mockResend = testSetup.mockResend;
    jest.clearAllMocks();
  });

  describe('POST /api/send-confirmation', () => {
    it('should send confirmation email successfully', async () => {
      const testEmail = 'test@example.com';
      const mockResult = { id: 'email-123', to: testEmail };
      
      mockResend.emails.send.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        result: mockResult
      });

      expect(mockResend.emails.send).toHaveBeenCalledWith({
        from: "noreply@coduxa.com",
        to: testEmail,
        subject: "Welcome to Coduxa - Confirm Your Email",
        html: expect.stringContaining('Welcome to Coduxa!')
      });

      expect(mockResend.emails.send).toHaveBeenCalledTimes(1);
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/api/send-confirmation')
        .send({})
        .expect(400);

      expect(response.body).toEqual({
        error: "Email is required"
      });

      expect(mockResend.emails.send).not.toHaveBeenCalled();
    });

    it('should return 400 when email is empty string', async () => {
      const response = await request(app)
        .post('/api/send-confirmation')
        .send({ email: '' })
        .expect(400);

      expect(response.body).toEqual({
        error: "Email is required"
      });

      expect(mockResend.emails.send).not.toHaveBeenCalled();
    });

    it('should handle email service errors gracefully', async () => {
      const testEmail = 'test@example.com';
      const mockError = new Error('Email service error');
      
      mockResend.emails.send.mockRejectedValue(mockError);

      const response = await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(500);

      expect(response.body).toEqual({
        error: "Failed to send email"
      });

      expect(mockResend.emails.send).toHaveBeenCalledTimes(1);
    });

    it('should include correct email template content', async () => {
      const testEmail = 'user@example.com';
      const mockResult = { id: 'email-456', to: testEmail };
      
      mockResend.emails.send.mockResolvedValue(mockResult);

      await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(200);

      const emailCall = mockResend.emails.send.mock.calls[0][0];
      
      // Check email structure
      expect(emailCall.from).toBe("noreply@coduxa.com");
      expect(emailCall.to).toBe(testEmail);
      expect(emailCall.subject).toBe("Welcome to Coduxa - Confirm Your Email");
      
      // Check HTML content
      expect(emailCall.html).toContain('Welcome to Coduxa!');
      expect(emailCall.html).toContain('Programming Certification Platform');
      expect(emailCall.html).toContain('Confirm Your Email');
      expect(emailCall.html).toContain('Thank you for signing up for Coduxa!');
      expect(emailCall.html).toContain('Confirm Email');
      expect(emailCall.html).toContain('The Coduxa Team');
      expect(emailCall.html).toContain('coduxa.vercel.app');
      
      // Check confirmation link
      const encodedEmail = encodeURIComponent(testEmail);
      expect(emailCall.html).toContain(`/confirm?email=${encodedEmail}`);
    });

    it('should handle special characters in email', async () => {
      const testEmail = 'test+special@example-domain.co.uk';
      const mockResult = { id: 'email-789', to: testEmail };
      
      mockResend.emails.send.mockResolvedValue(mockResult);

      await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(200);

      const emailCall = mockResend.emails.send.mock.calls[0][0];
      expect(emailCall.to).toBe(testEmail);
      
      // Check that email is properly encoded in the confirmation link
      const encodedEmail = encodeURIComponent(testEmail);
      expect(emailCall.html).toContain(`/confirm?email=${encodedEmail}`);
    });

    it('should use environment variable for frontend URL', async () => {
      const testEmail = 'test@example.com';
      const mockResult = { id: 'email-env', to: testEmail };
      
      mockResend.emails.send.mockResolvedValue(mockResult);

      await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(200);

      const emailCall = mockResend.emails.send.mock.calls[0][0];
      
      // Should use the test environment variable
      expect(emailCall.html).toContain('https://test.coduxa.vercel.app/confirm');
    });
  });
});
