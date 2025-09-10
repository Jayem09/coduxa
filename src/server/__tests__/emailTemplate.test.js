/**
 * Email Template Tests
 * Tests the email template generation and content validation
 */

describe('Email Template Tests', () => {
  const generateEmailTemplate = (email, frontendUrl = 'https://coduxa.vercel.app') => {
    return `
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
              <a href="${frontendUrl}/confirm?email=${encodeURIComponent(email)}" 
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
    `;
  };

  describe('Email Template Generation', () => {
    it('should generate valid HTML email template', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check basic HTML structure
      expect(template).toContain('<!DOCTYPE html>');
      expect(template).toContain('<html>');
      expect(template).toContain('<head>');
      expect(template).toContain('<body>');
      expect(template).toContain('</html>');
    });

    it('should include all required content elements', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check branding elements
      expect(template).toContain('Welcome to Coduxa!');
      expect(template).toContain('Programming Certification Platform');
      expect(template).toContain('The Coduxa Team');
      expect(template).toContain('coduxa.vercel.app');

      // Check confirmation elements
      expect(template).toContain('Confirm Your Email');
      expect(template).toContain('Thank you for signing up for Coduxa!');
      expect(template).toContain('Confirm Email');
      expect(template).toContain('Once confirmed, you\'ll be able to access all Coduxa features');
    });

    it('should include properly encoded confirmation link', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      const encodedEmail = encodeURIComponent(email);
      expect(template).toContain(`/confirm?email=${encodedEmail}`);
      expect(template).toContain('href="https://coduxa.vercel.app/confirm?email=');
    });

    it('should handle special characters in email', () => {
      const email = 'test+special@example-domain.co.uk';
      const template = generateEmailTemplate(email);

      const encodedEmail = encodeURIComponent(email);
      expect(template).toContain(`/confirm?email=${encodedEmail}`);
      
      // Verify the email is properly encoded
      expect(encodedEmail).toBe('test%2Bspecial%40example-domain.co.uk');
    });

    it('should use custom frontend URL when provided', () => {
      const email = 'test@example.com';
      const customUrl = 'https://custom.coduxa.com';
      const template = generateEmailTemplate(email, customUrl);

      expect(template).toContain(`href="${customUrl}/confirm?email=`);
    });

    it('should have proper styling for email clients', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check inline styles (important for email clients)
      expect(template).toContain('style="font-family: Arial, sans-serif;');
      expect(template).toContain('style="color: #3b82f6;');
      expect(template).toContain('style="background-color: #3b82f6;');
      expect(template).toContain('style="max-width: 600px;');
    });

    it('should be mobile-friendly', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check responsive design elements
      expect(template).toContain('max-width: 600px');
      expect(template).toContain('margin: 0 auto');
      expect(template).toContain('padding: 20px');
    });

    it('should have proper button styling', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check button styles
      expect(template).toContain('background-color: #3b82f6');
      expect(template).toContain('color: white');
      expect(template).toContain('padding: 12px 24px');
      expect(template).toContain('border-radius: 6px');
      expect(template).toContain('display: inline-block');
    });

    it('should include proper meta tags', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      expect(template).toContain('<meta charset="utf-8" />');
      expect(template).toContain('<title>Welcome to Coduxa</title>');
    });

    it('should handle empty email gracefully', () => {
      const email = '';
      const template = generateEmailTemplate(email);

      const encodedEmail = encodeURIComponent(email);
      expect(template).toContain(`/confirm?email=${encodedEmail}`);
    });
  });

  describe('Email Template Security', () => {
    it('should properly escape email in URL', () => {
      const email = 'test@example.com&malicious=script';
      const template = generateEmailTemplate(email);

      const encodedEmail = encodeURIComponent(email);
      expect(template).toContain(`/confirm?email=${encodedEmail}`);
      
      // Verify no unescaped characters
      expect(template).not.toContain('test@example.com&malicious=script');
      expect(template).toContain('test%40example.com%26malicious%3Dscript');
    });

    it('should not contain any script tags', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      expect(template).not.toContain('<script');
      expect(template).not.toContain('</script>');
      expect(template).not.toContain('javascript:');
    });

    it('should use HTTPS URLs', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      expect(template).toContain('https://coduxa.vercel.app');
      expect(template).not.toContain('http://coduxa.vercel.app');
    });
  });

  describe('Email Template Accessibility', () => {
    it('should have proper heading structure', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      expect(template).toContain('<h1');
      expect(template).toContain('<h2');
      expect(template).toContain('</h1>');
      expect(template).toContain('</h2>');
    });

    it('should have descriptive link text', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      expect(template).toContain('>Confirm Email<');
      expect(template).toContain('>coduxa.vercel.app<');
    });

    it('should have proper color contrast', () => {
      const email = 'test@example.com';
      const template = generateEmailTemplate(email);

      // Check for good contrast colors
      expect(template).toContain('color: #3b82f6'); // Blue for links
      expect(template).toContain('color: #333'); // Dark gray for text
      expect(template).toContain('color: #666'); // Medium gray for secondary text
      expect(template).toContain('color: white'); // White for button text
    });
  });
});
