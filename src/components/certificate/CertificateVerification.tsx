import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Hash,
  Calendar,
  User,
  Award,
  ExternalLink,
  Copy,
  QrCode
} from 'lucide-react';

interface VerificationResult {
  isValid: boolean;
  certificate?: {
    id: string;
    recipientName: string;
    courseName: string;
    completionDate: Date;
    score: number;
    maxScore: number;
    issuerName: string;
    skills: string[];
    validUntil?: Date;
    issuedDate: Date;
  };
  error?: string;
}

// Mock verification function - in real app, this would call an API
const verifyCertificate = async (certificateId: string): Promise<VerificationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - in real app, this would come from database
  const mockCertificates: { [key: string]: any } = {
    'CERT-ABC123': {
      id: 'CERT-ABC123',
      recipientName: 'John Doe',
      courseName: 'JavaScript Fundamentals',
      completionDate: new Date('2024-01-15'),
      score: 85,
      maxScore: 100,
      issuerName: 'Coduxa Platform',
      skills: ['Variables', 'Functions', 'Objects', 'Arrays'],
      validUntil: new Date('2025-01-15'),
      issuedDate: new Date('2024-01-15')
    },
    'CERT-DEF456': {
      id: 'CERT-DEF456',
      recipientName: 'Jane Smith',
      courseName: 'React Development',
      completionDate: new Date('2024-02-20'),
      score: 92,
      maxScore: 100,
      issuerName: 'Coduxa Platform',
      skills: ['Components', 'Hooks', 'State Management', 'Routing'],
      validUntil: new Date('2025-02-20'),
      issuedDate: new Date('2024-02-20')
    }
  };

  const certificate = mockCertificates[certificateId.toUpperCase()];
  
  if (!certificate) {
    return {
      isValid: false,
      error: 'Certificate not found. Please check the certificate ID and try again.'
    };
  }

  // Check if certificate is expired
  if (certificate.validUntil && new Date() > certificate.validUntil) {
    return {
      isValid: false,
      certificate,
      error: 'This certificate has expired.'
    };
  }

  return {
    isValid: true,
    certificate
  };
};

export default function CertificateVerification() {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      const result = await verifyCertificate(certificateId.trim());
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({
        isValid: false,
        error: 'An error occurred while verifying the certificate. Please try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const copyCertificateId = async () => {
    try {
      await navigator.clipboard.writeText(certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying certificate ID:', error);
    }
  };

  const generateVerificationUrl = () => {
    return `${window.location.origin}/verify/${certificateId}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
        <p className="text-gray-600">Verify the authenticity of certificates issued by Coduxa</p>
      </div>

      {/* Verification Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Verify Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificateId" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Certificate ID
            </Label>
            <div className="flex gap-2">
              <Input
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID (e.g., CERT-ABC123)"
                className="font-mono"
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              />
              <Button 
                onClick={handleVerify}
                disabled={!certificateId.trim() || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Enter the certificate ID found at the bottom of the certificate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Verification Result */}
      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationResult.isValid ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Certificate Verified
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Verification Failed
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {verificationResult.isValid && verificationResult.certificate ? (
              <div className="space-y-6">
                {/* Success Alert */}
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This certificate is valid and authentic. It was issued by {verificationResult.certificate.issuerName}.
                  </AlertDescription>
                </Alert>

                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Certificate Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="font-medium text-gray-900">{verificationResult.certificate.recipientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Course:</span>
                        <span className="font-medium text-gray-900">{verificationResult.certificate.courseName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Score:</span>
                        <span className="font-medium text-gray-900">
                          {verificationResult.certificate.score}/{verificationResult.certificate.maxScore} 
                          ({Math.round((verificationResult.certificate.score / verificationResult.certificate.maxScore) * 100)}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completion Date:</span>
                        <span className="font-medium text-gray-900">
                          {verificationResult.certificate.completionDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="font-medium text-gray-900">
                          {verificationResult.certificate.validUntil 
                            ? verificationResult.certificate.validUntil.toLocaleDateString()
                            : 'Lifetime'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills Demonstrated</h4>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyCertificateId}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Certificate ID
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(generateVerificationUrl(), '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Share Verification Link
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // In a real app, this would generate a QR code
                      alert('QR Code generation would be implemented here');
                    }}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Error Alert */}
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {verificationResult.error}
                  </AlertDescription>
                </Alert>

                {/* Help Text */}
                <div className="text-sm text-gray-600">
                  <p className="mb-2">If you believe this is an error, please:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Double-check the certificate ID</li>
                    <li>Ensure the certificate was issued by Coduxa</li>
                    <li>Contact support if the issue persists</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">How to Verify a Certificate</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>1. Locate the Certificate ID at the bottom of the certificate</p>
            <p>2. Enter the ID in the verification form above</p>
            <p>3. Click "Verify" to check the certificate's authenticity</p>
            <p>4. View the verification results and certificate details</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
