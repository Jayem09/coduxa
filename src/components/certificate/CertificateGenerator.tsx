import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Award, 
  Hash,
  Plus,
  X,
  Download,
  Eye
} from 'lucide-react';
import Certificate from './Certificate';

interface CertificateFormData {
  recipientName: string;
  courseName: string;
  completionDate: Date;
  score: number;
  maxScore: number;
  skills: string[];
  validUntil?: Date;
  issuerName: string;
}

export default function CertificateGenerator() {
  const [formData, setFormData] = useState<CertificateFormData>({
    recipientName: '',
    courseName: '',
    completionDate: new Date(),
    score: 0,
    maxScore: 100,
    skills: [],
    validUntil: undefined,
    issuerName: 'Coduxa Platform'
  });

  const [newSkill, setNewSkill] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<any>(null);

  const generateCertificateId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `CERT-${timestamp}-${random}`.toUpperCase();
  };

  const handleInputChange = (field: keyof CertificateFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const generateCertificate = () => {
    const certificateData = {
      id: generateCertificateId(),
      recipientName: formData.recipientName,
      courseName: formData.courseName,
      completionDate: formData.completionDate,
      score: formData.score,
      maxScore: formData.maxScore,
      certificateId: generateCertificateId(),
      issuerName: formData.issuerName,
      skills: formData.skills,
      validUntil: formData.validUntil,
      verificationUrl: `https://coduxa.com/verify/${generateCertificateId()}`
    };

    setGeneratedCertificate(certificateData);
    setShowPreview(true);
  };

  const resetForm = () => {
    setFormData({
      recipientName: '',
      courseName: '',
      completionDate: new Date(),
      score: 0,
      maxScore: 100,
      skills: [],
      validUntil: undefined,
      issuerName: 'Coduxa Platform'
    });
    setGeneratedCertificate(null);
    setShowPreview(false);
  };

  if (showPreview && generatedCertificate) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Certificate Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <Eye className="h-4 w-4 mr-2" />
              Edit Certificate
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Generate New
            </Button>
          </div>
        </div>
        
        <Certificate 
          data={generatedCertificate}
          onDownload={() => console.log('Certificate downloaded')}
          onShare={() => console.log('Certificate shared')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Certificate Generator</h1>
        <p className="text-gray-600">Create professional certificates for course completions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certificate Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipient Name */}
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Recipient Name
              </Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleInputChange('recipientName', e.target.value)}
                placeholder="Enter recipient's full name"
              />
            </div>

            {/* Course Name */}
            <div className="space-y-2">
              <Label htmlFor="courseName" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Course Name
              </Label>
              <Input
                id="courseName"
                value={formData.courseName}
                onChange={(e) => handleInputChange('courseName', e.target.value)}
                placeholder="Enter course or certification name"
              />
            </div>

            {/* Completion Date */}
            <div className="space-y-2">
              <Label htmlFor="completionDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Completion Date
              </Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate.toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('completionDate', new Date(e.target.value))}
              />
            </div>

            {/* Score Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="score">Score</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max={formData.maxScore}
                  value={formData.score}
                  onChange={(e) => handleInputChange('score', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxScore">Maximum Score</Label>
                <Input
                  id="maxScore"
                  type="number"
                  min="1"
                  value={formData.maxScore}
                  onChange={(e) => handleInputChange('maxScore', parseInt(e.target.value) || 100)}
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-2">
              <Label>Skills Demonstrated</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Valid Until */}
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until (Optional)</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil ? formData.validUntil.toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange('validUntil', e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>

            {/* Issuer Name */}
            <div className="space-y-2">
              <Label htmlFor="issuerName">Issuer Name</Label>
              <Input
                id="issuerName"
                value={formData.issuerName}
                onChange={(e) => handleInputChange('issuerName', e.target.value)}
                placeholder="Organization or platform name"
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generateCertificate}
              className="w-full"
              disabled={!formData.recipientName || !formData.courseName}
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Certificate Preview</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {formData.recipientName || 'Recipient Name'} will receive a certificate for
                </p>
                <div className="font-semibold text-lg text-gray-900 mb-2">
                  {formData.courseName || 'Course Name'}
                </div>
                <div className="text-sm text-gray-600">
                  Score: {formData.score}/{formData.maxScore} ({Math.round((formData.score / formData.maxScore) * 100)}%)
                </div>
                {formData.skills.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {formData.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {formData.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{formData.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Fill in the details on the left to see a full preview
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
