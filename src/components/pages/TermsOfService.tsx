import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              Welcome to Coduxa, an online programming certification platform. These Terms of Service 
              ("Terms") govern your use of our website and services. By accessing or using our platform, 
              you agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Coduxa provides an online platform for programming certification exams, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Programming skill assessments and exams</li>
              <li>Digital certification issuance</li>
              <li>Learning resources and study materials</li>
              <li>Progress tracking and analytics</li>
              <li>Leaderboards and performance comparisons</li>
              <li>Career guidance and roadmap tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
            <p className="mb-4">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">3.2 Account Requirements</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You must be at least 13 years old to create an account</li>
              <li>One account per person</li>
              <li>No sharing of account credentials</li>
              <li>Valid email address required for verification</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Exam Rules and Conduct</h2>
            
            <h3 className="text-xl font-medium mb-3">4.1 Exam Integrity</h3>
            <p className="mb-4">To maintain the integrity of our certification program, you agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Complete exams independently without external assistance</li>
              <li>Not share exam questions or answers with others</li>
              <li>Not use unauthorized materials during exams</li>
              <li>Not attempt to circumvent security measures</li>
              <li>Report any technical issues immediately</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">4.2 Prohibited Conduct</h3>
            <p className="mb-4">The following activities are strictly prohibited:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cheating, plagiarism, or academic dishonesty</li>
              <li>Using automated tools or bots</li>
              <li>Attempting to hack or compromise the platform</li>
              <li>Harassment or inappropriate behavior</li>
              <li>Violation of intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Certifications and Credentials</h2>
            
            <h3 className="text-xl font-medium mb-3">5.1 Certification Validity</h3>
            <p className="mb-4">
              Certificates issued by Coduxa represent successful completion of our assessment criteria 
              at the time of issuance. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Update exam content and standards</li>
              <li>Revoke certificates for policy violations</li>
              <li>Verify certificate authenticity</li>
              <li>Update certification requirements</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">5.2 Certificate Usage</h3>
            <p className="mb-4">
              You may use your certificates for professional purposes, but you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Alter or modify certificate content</li>
              <li>Misrepresent your certification status</li>
              <li>Use certificates for fraudulent purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment and Refunds</h2>
            
            <h3 className="text-xl font-medium mb-3">6.1 Payment Terms</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Payment must be made before accessing paid features</li>
              <li>We accept various payment methods through secure processors</li>
              <li>Prices may change with notice</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">6.2 Refund Policy</h3>
            <p className="mb-4">
              Refunds may be considered in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Technical issues preventing exam completion</li>
              <li>Duplicate payments</li>
              <li>Billing errors on our part</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium mb-3">7.1 Our Content</h3>
            <p className="mb-4">
              All content on our platform, including exam questions, materials, and software, 
              is protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Copy, distribute, or reproduce our content</li>
              <li>Reverse engineer our software</li>
              <li>Create derivative works without permission</li>
              <li>Remove copyright notices</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">7.2 User Content</h3>
            <p className="mb-4">
              You retain ownership of content you submit, but grant us a license to use it 
              for platform operation and improvement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>
            <p className="mb-4">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. 
              We may:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Perform scheduled maintenance</li>
              <li>Update system features</li>
              <li>Address technical issues</li>
              <li>Modify or discontinue services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            
            <h3 className="text-xl font-medium mb-3">10.1 Termination by You</h3>
            <p className="mb-4">
              You may terminate your account at any time by contacting us or using account settings.
            </p>

            <h3 className="text-xl font-medium mb-3">10.2 Termination by Us</h3>
            <p className="mb-4">
              We may suspend or terminate your account for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Platform abuse or misuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-medium mb-3">11.1 Service Disclaimer</h3>
            <p className="mb-4">
              Our service is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Uninterrupted service availability</li>
              <li>Error-free operation</li>
              <li>Specific exam outcomes</li>
              <li>Employment or career advancement</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">11.2 Limitation of Liability</h3>
            <p className="mb-4">
              To the maximum extent permitted by law, we shall not be liable for any indirect, 
              incidental, or consequential damages arising from your use of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by and construed in accordance with applicable laws. 
              Any disputes will be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We may update these Terms from time to time. We will notify users of significant 
              changes through our platform or email. Continued use constitutes acceptance of 
              updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> legal@coduxa.com</p>
              <p><strong>Support:</strong> support@coduxa.com</p>
              <p><strong>Address:</strong> Coduxa Legal Team</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
