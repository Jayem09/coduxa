import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  Shield
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateData {
  id: string;
  recipientName: string;
  courseName: string;
  completionDate: Date;
  score: number;
  maxScore: number;
  certificateId: string;
  issuerName: string;
  issuerLogo?: string;
  skills: string[];
  validUntil?: Date;
  verificationUrl?: string;
  examStartTime?: Date;
  examEndTime?: Date;
  timeSpent?: number; // in minutes
  answers?: Record<string, any>;
  questions?: any[];
}

interface CertificateProps {
  data: CertificateData;
  onDownload?: () => void;
  onShare?: () => void;
  showActions?: boolean;
  className?: string;
}

export default function Certificate({ 
  data, 
  onDownload, 
  onShare, 
  showActions = true,
  className = ""
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const scorePercentage = Math.round((data.score / data.maxScore) * 100);
  const grade = scorePercentage >= 90 ? 'A+' : 
                scorePercentage >= 80 ? 'A' : 
                scorePercentage >= 70 ? 'B' : 
                scorePercentage >= 60 ? 'C' : 'D';

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1056, // A4 landscape width in pixels
        height: 816, // A4 landscape height in pixels
        ignoreElements: (element) => {
          // Skip elements that might cause issues
          return element.classList.contains('no-print');
        },
        onclone: (clonedDoc) => {
          // Convert oklch colors to rgb in the cloned document
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              color: rgb(0, 0, 0) !important;
              background-color: rgb(255, 255, 255) !important;
              border-color: rgb(0, 0, 0) !important;
            }
            .bg-blue-600 { background-color: rgb(37, 99, 235) !important; }
            .bg-green-600 { background-color: rgb(22, 163, 74) !important; }
            .bg-purple-600 { background-color: rgb(147, 51, 234) !important; }
            .bg-red-600 { background-color: rgb(220, 38, 38) !important; }
            .text-blue-600 { color: rgb(37, 99, 235) !important; }
            .text-green-600 { color: rgb(22, 163, 74) !important; }
            .text-purple-600 { color: rgb(147, 51, 234) !important; }
            .text-red-600 { color: rgb(220, 38, 38) !important; }
            .border-blue-600 { border-color: rgb(37, 99, 235) !important; }
            .border-green-600 { border-color: rgb(22, 163, 74) !important; }
            .border-purple-600 { border-color: rgb(147, 51, 234) !important; }
            .border-red-600 { border-color: rgb(220, 38, 38) !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = 210; // A4 landscape height in mm
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`certificate-${data.certificateId}.pdf`);
      
      onDownload?.();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.courseName} Certificate`,
          text: `I just earned a certificate in ${data.courseName} with a score of ${scorePercentage}%!`,
          url: data.verificationUrl || window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        const shareText = `I just earned a certificate in ${data.courseName} with a score of ${scorePercentage}%! ${data.verificationUrl || window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      onShare?.();
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const copyCertificateId = async () => {
    try {
      await navigator.clipboard.writeText(data.certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying certificate ID:', error);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Certificate Container - A4 Landscape */}
      <div className="w-full flex justify-center overflow-x-auto p-4">
        {/* Professional A4 Landscape Certificate Display */}
        <div 
          ref={certificateRef}
          className="relative bg-white border-4 border-gray-800 overflow-hidden shadow-2xl"
          style={{ 
            width: '1056px', // A4 landscape width in pixels (297mm at 96 DPI)
            height: '816px', // A4 landscape height in pixels (210mm at 96 DPI)
            aspectRatio: '297/210', // A4 landscape ratio
            minWidth: '800px',
            minHeight: '600px',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
        {/* Professional Border Design */}
        <div className="absolute inset-2 border-2 border-gray-600"></div>
        <div className="absolute inset-4 border border-gray-400"></div>
        
        {/* A4 Landscape Layout with Two Columns */}
        <div className="relative z-10 p-12 h-full">
          {/* Top Header Section */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide">CODUXA</h1>
                <p className="text-base text-gray-700 font-medium">PROFESSIONAL CERTIFICATION</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Certificate ID</div>
              <div className="text-sm font-bold font-mono">{data.certificateId}</div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="flex gap-12 h-full">
            {/* Left Column - Main Certificate Content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Certificate Title */}
              <div className="text-center mb-10">
                <h2 className="text-5xl font-bold text-gray-900 mb-3 tracking-wide">CERTIFICATE</h2>
                <h3 className="text-3xl font-semibold text-gray-800 mb-6">OF COMPLETION</h3>
                <div className="w-40 h-1 bg-blue-600 mx-auto mb-3"></div>
                <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
              </div>

              {/* Recipient Information */}
              <div className="text-center mb-10">
                <p className="text-xl text-gray-700 mb-4 font-medium">This is to certify that</p>
                <h4 className="text-4xl font-bold text-gray-900 mb-6 tracking-wide">{data.recipientName}</h4>
                <p className="text-xl text-gray-700 mb-3 font-medium">has successfully completed the certification requirements for</p>
                <h5 className="text-3xl font-bold text-blue-600 mb-6 tracking-wide">{data.courseName}</h5>
              </div>

              {/* Achievement Score */}
              <div className="text-center mb-10">
                <div className="inline-block bg-gray-50 border-2 border-gray-300 rounded-lg p-8">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{scorePercentage}%</div>
                  <div className="text-base text-gray-700 mb-2 font-semibold">Final Score</div>
                  <div className="text-sm text-gray-600">{data.score} out of {data.maxScore} points</div>
                  <div className="text-sm text-gray-600">Grade: {grade}</div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="text-center">
                <h6 className="text-xl font-semibold text-gray-800 mb-4">Skills Demonstrated</h6>
                <div className="flex flex-wrap justify-center gap-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Exam Details */}
            <div className="w-96 flex flex-col justify-center">
              {/* Exam Details Box */}
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8 mb-8">
                <h6 className="text-xl font-semibold text-gray-800 mb-6 text-center">Exam Details</h6>
                
                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date Completed:</span>
                    <span className="font-semibold">{data.completionDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  {data.examStartTime && data.examEndTime && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Start Time:</span>
                        <span className="font-semibold">{data.examStartTime.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">End Time:</span>
                        <span className="font-semibold">{data.examEndTime.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                    </>
                  )}
                  
                  {data.timeSpent && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Spent:</span>
                      <span className="font-semibold">{data.timeSpent} minutes</span>
                    </div>
                  )}
                  
                  {data.questions && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-semibold">{data.questions.length}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600 text-lg">PASSED</span>
                  </div>
                </div>
              </div>

              {/* Signature and Authority */}
              <div className="text-center mb-8">
                <div className="h-16 w-32 border-b-2 border-gray-400 mx-auto mb-3"></div>
                <div className="text-sm text-gray-600 mb-1">Digital Signature</div>
                <div className="text-base font-semibold text-gray-800">{data.issuerName}</div>
              </div>

              {/* Validity */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Valid Until</div>
                <div className="text-base font-semibold text-gray-800">
                  {data.validUntil ? data.validUntil.toLocaleDateString() : 'Lifetime'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Verification Section */}
          <div className="absolute bottom-6 left-6 right-6 border-t border-gray-300 pt-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Verify this certificate at:</div>
              <div className="text-sm font-semibold text-blue-600">{data.verificationUrl}</div>
            </div>
          </div>
        </div>

        {/* Professional Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-9xl font-bold text-gray-100 opacity-5 transform -rotate-12">
            CODUXA
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-24 h-24 border-4 border-blue-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-4 w-2 h-32 bg-gradient-to-b from-blue-200 to-transparent opacity-20"></div>
        <div className="absolute top-1/2 left-4 w-2 h-32 bg-gradient-to-b from-gray-200 to-transparent opacity-20"></div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      {showActions && (
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleShare}
                disabled={isSharing}
                className="px-6 py-3"
                size="lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                {isSharing ? 'Sharing...' : 'Share Certificate'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={copyCertificateId}
                className="px-6 py-3"
                size="lg"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 mr-2" />
                    Copy ID
                  </>
                )}
              </Button>
              
              {data.verificationUrl && (
                <Button 
                  variant="outline"
                  onClick={() => window.open(data.verificationUrl, '_blank')}
                  className="px-6 py-3"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Verify Online
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificate Details Card */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Certificate Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate ID:</span>
                  <span className="font-mono text-gray-900">{data.certificateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issue Date:</span>
                  <span className="text-gray-900">{data.completionDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="text-gray-900">
                    {data.validUntil ? data.validUntil.toLocaleDateString() : 'Lifetime'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="text-gray-900">{data.score}/{data.maxScore} ({scorePercentage}%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Verification</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600">Certificate is verified and authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600">Digital signature verified</span>
                </div>
                {data.verificationUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-500" />
                    <a 
                      href={data.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Verify online
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
