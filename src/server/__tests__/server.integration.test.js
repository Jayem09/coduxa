import request from 'supertest';
import express from 'express';
import { Resend } from 'resend';

// Mock Resend for integration tests
jest.mock('resend');

describe('Server Integration Tests', () => {
  let app;
  let mockResendInstance;
  let mockEmailsSend;

  beforeAll(() => {
    // Create a minimal server setup for testing
    app = express();
    app.use(express.json());

    // Mock Resend
    mockEmailsSend = jest.fn();
    mockResendInstance = {
      emails: {
        send: mockEmailsSend
      }
    };
    
    const MockedResend = Resend;
    MockedResend.mockImplementation(() => mockResendInstance);
    const resend = new MockedResend(process.env.RESEND_API_KEY);

    // Add the email confirmation endpoint
    app.post("/api/send-confirmation", async (req, res) => {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      try {
        const result = await resend.emails.send({
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

    // Add health check endpoint
    app.get("/health", (req, res) => {
      res.json({ status: "OK", timestamp: new Date().toISOString() });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Email Confirmation Integration', () => {
    it('should handle complete signup flow', async () => {
      const testEmail = 'integration-test@example.com';
      const mockResult = { 
        id: 'email-integration-123', 
        to: testEmail,
        from: 'noreply@coduxa.com'
      };
      
      mockEmailsSend.mockResolvedValue(mockResult);

      // Simulate the signup flow
      const response = await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(200);

      // Verify response
      expect(response.body).toEqual({
        success: true,
        result: mockResult
      });

      // Verify email was sent with correct parameters
      expect(mockEmailsSend).toHaveBeenCalledWith({
        from: "noreply@coduxa.com",
        to: testEmail,
        subject: "Welcome to Coduxa - Confirm Your Email",
        html: expect.stringContaining('Welcome to Coduxa!')
      });

      // Verify email content includes confirmation link
      const emailCall = mockEmailsSend.mock.calls[0][0];
      expect(emailCall.html).toContain(`/confirm?email=${encodeURIComponent(testEmail)}`);
    });

    it('should handle email service failure gracefully', async () => {
      const testEmail = 'failure-test@example.com';
      const mockError = new Error('Email service unavailable');
      
      mockEmailsSend.mockRejectedValue(mockError);

      const response = await request(app)
        .post('/api/send-confirmation')
        .send({ email: testEmail })
        .expect(500);

      expect(response.body).toEqual({
        error: "Failed to send email"
      });

      expect(mockEmailsSend).toHaveBeenCalledTimes(1);
    });

    it('should validate email parameter', async () => {
      const invalidRequests = [
        { email: '' },
        { email: null },
        { email: undefined },
        {},
        { email: '   ' }
      ];

      for (const invalidRequest of invalidRequests) {
        const response = await request(app)
          .post('/api/send-confirmation')
          .send(invalidRequest)
          .expect(400);

        expect(response.body).toEqual({
          error: "Email is required"
        });
      }

      expect(mockEmailsSend).not.toHaveBeenCalled();
    });
  });
});
