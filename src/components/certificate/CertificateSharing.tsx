import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Share2, 
  Copy, 
  ExternalLink, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail,
  CheckCircle,
  Award,
  Hash,
  Calendar
} from 'lucide-react';

interface CertificateSharingProps {
  certificateData: {
    id: string;
    recipientName: string;
    courseName: string;
    completionDate: Date;
    score: number;
    maxScore: number;
    certificateId: string;
    skills: string[];
  };
  verificationUrl?: string;
}

export default function CertificateSharing({ certificateData, verificationUrl }: CertificateSharingProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<string | null>(null);

  const scorePercentage = Math.round((certificateData.score / certificateData.maxScore) * 100);
  const shareUrl = verificationUrl || `${window.location.origin}/verify/${certificateData.certificateId}`;
  
  const shareTexts = {
    default: `I just earned a certificate in ${certificateData.courseName} with a score of ${scorePercentage}%! 🎉 Check out my achievement: ${shareUrl}`,
    linkedin: `I'm excited to share that I've successfully completed the ${certificateData.courseName} certification with a score of ${scorePercentage}%! This achievement demonstrates my expertise in ${certificateData.skills.slice(0, 3).join(', ')}. Looking forward to applying these skills in my professional journey.`,
    twitter: `Just earned my ${certificateData.courseName} certificate with ${scorePercentage}%! 🏆 Skills: ${certificateData.skills.slice(0, 2).join(', ')} #Certification #Learning #ProfessionalDevelopment`,
    facebook: `I'm proud to share that I've completed the ${certificateData.courseName} certification with a score of ${scorePercentage}%! This represents my commitment to continuous learning and professional development.`,
    email: {
      subject: `Certificate Achievement: ${certificateData.courseName}`,
      body: `Hi there!

I'm excited to share that I've successfully completed the ${certificateData.courseName} certification with a score of ${scorePercentage}%!

Certificate Details:
• Course: ${certificateData.courseName}
• Score: ${certificateData.score}/${certificateData.maxScore} (${scorePercentage}%)
• Completion Date: ${certificateData.completionDate.toLocaleDateString()}
• Skills Demonstrated: ${certificateData.skills.join(', ')}

You can verify this certificate at: ${shareUrl}

Best regards,
${certificateData.recipientName}`
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareToSocial = async (platform: string) => {
    setIsSharing(platform);
    
    try {
      const text = shareTexts[platform as keyof typeof shareTexts] || shareTexts.default;
      const url = encodeURIComponent(shareUrl);
      const encodedText = encodeURIComponent(text);
      
      let shareUrl_final = '';
      
      switch (platform) {
        case 'twitter':
          shareUrl_final = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
          break;
        case 'linkedin':
          shareUrl_final = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'facebook':
          shareUrl_final = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
          break;
        case 'email':
          const emailUrl = `mailto:?subject=${encodeURIComponent(shareTexts.email.subject)}&body=${encodeURIComponent(shareTexts.email.body)}`;
          window.location.href = emailUrl;
          setIsSharing(null);
          return;
        default:
          if (navigator.share) {
            await navigator.share({
              title: `${certificateData.courseName} Certificate`,
              text: text,
              url: shareUrl
            });
            setIsSharing(null);
            return;
          }
      }
      
      if (shareUrl_final) {
        window.open(shareUrl_final, '_blank', 'width=600,height=400');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Share on LinkedIn'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      description: 'Share on Twitter'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-700 hover:bg-blue-800',
      description: 'Share on Facebook'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Send via Email'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Certificate Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{certificateData.courseName}</h3>
                <p className="text-sm text-gray-600">Completed by {certificateData.recipientName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Score:</span>
                <span className="font-medium">{scorePercentage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{certificateData.completionDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Share on Social Media</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  className={`${platform.color} text-white`}
                  onClick={() => shareToSocial(platform.name.toLowerCase())}
                  disabled={isSharing === platform.name.toLowerCase()}
                >
                  <platform.icon className="h-4 w-4 mr-2" />
                  {isSharing === platform.name.toLowerCase() ? 'Sharing...' : platform.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Copy Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Copy & Share</h4>
            <div className="space-y-3">
              {/* Share Text */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Share Text
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg border text-sm text-gray-700">
                    {shareTexts.default}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shareTexts.default, 'text')}
                  >
                    {copied === 'text' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Verification URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Verification URL
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg border text-sm font-mono text-gray-700">
                    {shareUrl}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shareUrl, 'url')}
                  >
                    {copied === 'url' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Certificate ID */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Certificate ID
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-gray-50 rounded-lg border text-sm font-mono text-gray-700">
                    {certificateData.certificateId}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(certificateData.certificateId, 'id')}
                  >
                    {copied === 'id' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Badges */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Skills Demonstrated</h4>
            <div className="flex flex-wrap gap-2">
              {certificateData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Verification Link */}
          {verificationUrl && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Verify Certificate</h4>
                  <p className="text-sm text-gray-600">Share this link for others to verify your certificate</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(verificationUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
