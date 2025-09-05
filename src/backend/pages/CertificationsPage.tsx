// src/backend/pages/CertificationsPage.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Award, 
  Trophy, 
  Target, 
  CheckCircle,
  Circle,
  Clock,
  Users,
  Star,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  BookOpen,
  Medal,
  Eye,
  ExternalLink,
  FileText,
  Shield
} from "lucide-react";
import { Certificate } from '../../components/certificate';
import { examResultsService, type ExamResult, type UserProfile } from '../../services/examResultsService';
import { supabase } from '../../components/lib/supabaseClient';

// Interfaces
interface EarnedCertification {
  id: string;
  title: string;
  description: string;
  earnedDate: Date;
  score: number;
  maxScore: number;
  examId: string;
  difficulty: string;
  validUntil?: Date;
  certificateUrl?: string;
  skills: string[];
}

interface ExamAttempt {
  id: string;
  examTitle: string;
  attemptDate: Date;
  score: number;
  maxScore: number;
  passed: boolean;
  timeSpent: number; // in minutes
}


// Calculate dynamic stats
const calculateStats = (certifications: EarnedCertification[], attempts: ExamAttempt[]) => {
  const totalCerts = certifications.length;
  const highestScore = certifications.length > 0 ? Math.max(...certifications.map(c => c.score)) : 0;
  const averageScore = certifications.length > 0 
    ? Math.round(certifications.reduce((sum, c) => sum + c.score, 0) / certifications.length)
    : 0;
  const totalAttempts = attempts.length;
  const passRate = attempts.length > 0 
    ? Math.round((attempts.filter(a => a.passed).length / attempts.length) * 100)
    : 0;

  return {
    totalCerts,
    highestScore,
    averageScore,
    totalAttempts,
    passRate
  };
};

const availableExams = [
  {
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts",
    duration: "45 min",
    difficulty: "Beginner",
    participants: 2543,
    credits: 5,
    popular: false
  },
  {
    title: "React Development",
    description: "Advanced React concepts and best practices",
    duration: "60 min", 
    difficulty: "Intermediate",
    participants: 1876,
    credits: 8,
    popular: true
  },
  {
    title: "Node.js Backend",
    description: "Server-side development with Node.js",
    duration: "90 min",
    difficulty: "Advanced", 
    participants: 987,
    credits: 12,
    popular: false
  },
];

const difficultyColors = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-yellow-100 text-yellow-800", 
  "Advanced": "bg-red-100 text-red-800"
};

export default function CertificationsPage() {
  const [earnedCertifications, setEarnedCertifications] = useState<EarnedCertification[]>([]);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('earned');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load exam results and user data
  useEffect(() => {
    const loadExamData = async () => {
      try {
        setLoading(true);
        
        // Get current user from Supabase auth
        const { data: { user } } = await supabase.auth.getUser();
        const currentUserId = user?.id || '550e8400-e29b-41d4-a716-446655440000';
        
        // Load user profile
        const profile = await examResultsService.getUserProfile(currentUserId);
        setUserProfile(profile);
        
        // Load exam results
        const results = await examResultsService.getUserExamResults(currentUserId);
        setExamResults(results);
        
        // Convert exam results to earned certifications (only passed exams)
        const passedResults = results.filter(result => result.passed);
        const certifications: EarnedCertification[] = passedResults.map(result => ({
          id: result.id,
          title: result.examTitle,
          description: `Certification for ${result.examTitle}`,
          earnedDate: result.endTime,
          score: result.score,
          maxScore: result.maxScore,
          examId: result.examId,
          difficulty: result.score >= 90 ? 'Advanced' : result.score >= 70 ? 'Intermediate' : 'Beginner',
          validUntil: new Date(result.endTime.getTime() + (365 * 24 * 60 * 60 * 1000)), // 1 year from completion
          skills: extractSkillsFromQuestions(result.questions)
        }));
        
        setEarnedCertifications(certifications);
        
        // Convert exam results to exam attempts
        const attempts: ExamAttempt[] = results.map(result => ({
          id: result.id,
          examTitle: result.examTitle,
          attemptDate: result.endTime,
          score: result.score,
          maxScore: result.maxScore,
          passed: result.passed,
          timeSpent: result.timeSpent
        }));
        
        setExamAttempts(attempts);
        
      } catch (error) {
        console.error('Error loading exam data:', error);
        console.log('Database not available. Please set up the database using DATABASE_SETUP.md');
        
        // Fallback to empty arrays if database fails
        setEarnedCertifications([]);
        setExamAttempts([]);
        
        // Set a fallback user profile with real user data if available
        const { data: { user } } = await supabase.auth.getUser();
        setUserProfile({
          id: user?.id || '550e8400-e29b-41d4-a716-446655440000',
          email: user?.email || 'johndinglasan12@gmail.com',
          fullName: user?.user_metadata?.full_name || 'John Dinglasan'
        });
      } finally {
        setLoading(false);
      }
    };

    loadExamData();
  }, []);

  // Extract skills from questions (helper function)
  const extractSkillsFromQuestions = (questions: any[]): string[] => {
    if (!questions || questions.length === 0) return ['Problem Solving', 'Technical Knowledge'];
    
    // This is a simplified extraction - in a real app, you'd have more sophisticated skill mapping
    const skills = new Set<string>();
    questions.forEach(question => {
      if (question.tags) {
        question.tags.forEach((tag: string) => skills.add(tag));
      }
      if (question.category) {
        skills.add(question.category);
      }
    });
    
    return skills.size > 0 ? Array.from(skills) : ['Problem Solving', 'Technical Knowledge'];
  };

  // Helper function to get user's display name
  const getUserDisplayName = () => {
    // First try to get from userProfile
    if (userProfile?.fullName && userProfile.fullName !== 'John Dinglasan') {
      return userProfile.fullName;
    }
    
    // Fallback to userProfile email if available
    if (userProfile?.email) {
      // Extract name from email (e.g., "john.doe@email.com" -> "John Doe")
      const emailName = userProfile.email.split('@')[0];
      const nameParts = emailName.split(/[._-]/);
      const formattedName = nameParts
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
      return formattedName;
    }
    
    return "Student";
  };

  // Convert earned certification to certificate data format
  const convertToCertificateData = (cert: EarnedCertification) => {
    const examResult = examResults.find(result => result.id === cert.id);
    const displayName = getUserDisplayName();
    
    return {
      id: cert.id,
      recipientName: displayName,
      courseName: cert.title,
      completionDate: cert.earnedDate,
      score: cert.score,
      maxScore: cert.maxScore,
      certificateId: examResult?.certificateId || `CERT-${cert.id.toUpperCase()}-${Date.now().toString(36)}`,
      issuerName: "Coduxa Platform",
      skills: cert.skills,
      validUntil: cert.validUntil,
      verificationUrl: `https://coduxa.com/verify/${examResult?.certificateId || cert.id}`,
      examStartTime: examResult?.startTime,
      examEndTime: examResult?.endTime,
      timeSpent: examResult?.timeSpent,
      answers: examResult?.answers,
      questions: examResult?.questions
    };
  };

  const stats = calculateStats(earnedCertifications, examAttempts);

  // Handle certificate selection
  const handleCertificateSelect = (certId: string) => {
    setSelectedCertificate(certId);
    const cert = earnedCertifications.find(c => c.id === certId);
    if (cert) {
      const data = convertToCertificateData(cert);
      setCertificateData(data);
    }
  };

  const handleStartExam = (examTitle: string) => {
    // Navigate to exam interface
    console.log(`Starting exam: ${examTitle}`);
    // In a real app, this would navigate to the exam interface
    alert(`Starting ${examTitle} exam...`);
  };


  const filteredExams = availableExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || exam.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <div className="p-5 max-w-8xl mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your certifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-8xl mx-auto space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Certifications</h2>
            <p className="text-muted-foreground">
              View and manage your earned certifications
            </p>
            <p className="text-sm text-muted-foreground">
              {earnedCertifications.length > 0 
                ? `You have ${earnedCertifications.length} certification${earnedCertifications.length !== 1 ? 's' : ''}`
                : 'Take an exam to earn your first certification'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Exams
            </Button>
          </div>
        </div>
      </Card>

      {/* Dynamic Stats Section */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="relative border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Total Certifications</CardTitle>
              <Award className="h-6 w-6 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{stats.totalCerts}</p>
            <p className="text-sm text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>

        <Card className="relative border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Highest Score</CardTitle>
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{stats.highestScore}%</p>
            <p className="text-sm text-muted-foreground">Your best performance</p>
          </CardContent>
        </Card>

        <Card className="relative border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Average Score</CardTitle>
              <Target className="h-6 w-6 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{stats.averageScore}%</p>
            <p className="text-sm text-muted-foreground">Across all certifications</p>
          </CardContent>
        </Card>

        <Card className="relative border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Total Attempts</CardTitle>
              <BookOpen className="h-6 w-6 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{stats.totalAttempts}</p>
            <p className="text-sm text-muted-foreground">Exam attempts made</p>
          </CardContent>
        </Card>

        <Card className="relative border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Pass Rate</CardTitle>
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
            <p className="text-3xl font-bold">{stats.passRate}%</p>
            <p className="text-sm text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="earned">Earned Certifications</TabsTrigger>
          <TabsTrigger value="history">Exam History</TabsTrigger>
          <TabsTrigger value="available">Available Exams</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Earned Certifications Tab */}
        <TabsContent value="earned" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Certifications</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>

          {earnedCertifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Certifications Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start taking exams to earn your first certification
              </p>
              <Button onClick={() => setActiveTab('available')}>
                Browse Available Exams
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Certificate List */}
              <div className="grid md:grid-cols-2 gap-6">
                {earnedCertifications.map((cert) => (
                  <Card key={cert.id} className="relative border">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold mb-2">{cert.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`${difficultyColors[cert.difficulty as keyof typeof difficultyColors]} text-xs`}>
                              {cert.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {cert.score}/{cert.maxScore} points
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCertificateSelect(cert.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>Earned: {cert.earnedDate.toLocaleDateString()}</span>
                        </div>
                        {cert.validUntil && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Valid until: {cert.validUntil.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                     

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Medal className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Certified</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCertificate(cert.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View & Download
                        </Button>
                      </div>
            </CardContent>
          </Card>
        ))}
      </div>

              {/* Certificate Display */}
              {selectedCertificate && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Certificate Preview</h3>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCertificate(null)}
                    >
                      Close
                    </Button>
                  </div>
                  {certificateData && (
                    <Certificate 
                      data={certificateData}
                      onDownload={() => console.log('Certificate downloaded')}
                      onShare={() => console.log('Certificate shared')}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Exam History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Exam History</h3>
            <div className="flex gap-2">
              <Input 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>

      <div className="space-y-4">
            {examAttempts
              .filter(attempt => 
                attempt.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((attempt) => (
                <Card key={attempt.id} className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{attempt.examTitle}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{attempt.attemptDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{attempt.timeSpent} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {attempt.score}/{attempt.maxScore}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((attempt.score / attempt.maxScore) * 100)}%
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          {attempt.passed ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : (
                            <Circle className="h-8 w-8 text-red-500" />
                          )}
                          <span className="text-xs font-medium mt-1">
                            {attempt.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Available Exams Tab */}
        <TabsContent value="available" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Available Exams</h3>
            <div className="flex gap-2">
              <Input 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
          <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
          </Button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
            <Card 
              key={exam.title} 
              className={`relative border ${exam.popular ? "border-blue-500" : ""}`}
            >
              {exam.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{exam.title}</CardTitle>
                  {exam.popular && <CheckCircle className="h-5 w-5 text-blue-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{exam.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{exam.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4" />
                    <span>{exam.credits} Credits required</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={`${difficultyColors[exam.difficulty as keyof typeof difficultyColors]} text-xs`}>
                    {exam.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <Star className="h-3 w-3 text-gray-300" />
                  </div>
                </div>

                <Button 
                  className={`w-full ${exam.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    onClick={() => handleStartExam(exam.title)}
                >
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Certificates</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Verify Certificate
              </Button>
              <Button size="sm" onClick={() => setActiveTab('earned')}>
                <FileText className="h-4 w-4 mr-2" />
                View All ({earnedCertifications.length})
              </Button>
            </div>
          </div>

          {earnedCertifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete exams to earn certificates that you can download as PDFs
              </p>
              <Button onClick={() => setActiveTab('available')}>
                Browse Available Exams
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Certificate Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {earnedCertifications.map((cert) => (
                  <Card key={cert.id} className="relative border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold mb-2">{cert.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`${difficultyColors[cert.difficulty as keyof typeof difficultyColors]} text-xs`}>
                              {cert.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {Math.round((cert.score / cert.maxScore) * 100)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>Earned: {cert.earnedDate.toLocaleDateString()}</span>
                        </div>
                        {cert.validUntil && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Valid until: {cert.validUntil.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{cert.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button 
                          className="flex-1"
                          onClick={() => setSelectedCertificate(cert.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedCertificate(cert.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Certificate Display */}
              {selectedCertificate && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Certificate Preview & Download</h3>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCertificate(null)}
                    >
                      Close
                    </Button>
                  </div>
                  {certificateData && (
                    <Certificate 
                      data={certificateData}
                      onDownload={() => {
                        console.log('Certificate downloaded successfully!');
                        // In a real app, you might show a success toast here
                      }}
                      onShare={() => {
                        console.log('Certificate shared successfully!');
                        // In a real app, you might show a success toast here
                      }}
                    />
                  )}
                </div>
              )}

              {/* Certificate Stats */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{earnedCertifications.length}</div>
                      <div className="text-sm text-gray-600">Certificates Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(earnedCertifications.reduce((sum, cert) => sum + (cert.score / cert.maxScore), 0) / earnedCertifications.length * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {earnedCertifications.filter(cert => cert.validUntil && new Date() < cert.validUntil).length}
                      </div>
                      <div className="text-sm text-gray-600">Valid Certificates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {earnedCertifications.reduce((sum, cert) => sum + cert.skills.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Skills Demonstrated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Achievements & Badges */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Achievements & Badges</h3>
          <Badge variant="outline" className="text-sm">
            {earnedCertifications.length} of 15 unlocked
          </Badge>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Achievement Badges */}
          <Card className={`p-4 text-center border-2 ${earnedCertifications.length >= 1 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${earnedCertifications.length >= 1 ? 'bg-yellow-400' : 'bg-gray-200'}`}>
                <Medal className={`h-6 w-6 ${earnedCertifications.length >= 1 ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-semibold text-sm">First Certification</h4>
              <p className="text-xs text-muted-foreground">Earn your first certification</p>
              {earnedCertifications.length >= 1 && (
                <Badge className="bg-yellow-400 text-yellow-900 text-xs">Unlocked</Badge>
              )}
            </div>
          </Card>

          <Card className={`p-4 text-center border-2 ${stats.highestScore >= 90 ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stats.highestScore >= 90 ? 'bg-green-400' : 'bg-gray-200'}`}>
                <Trophy className={`h-6 w-6 ${stats.highestScore >= 90 ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-semibold text-sm">High Achiever</h4>
              <p className="text-xs text-muted-foreground">Score 90% or higher</p>
              {stats.highestScore >= 90 && (
                <Badge className="bg-green-400 text-green-900 text-xs">Unlocked</Badge>
              )}
            </div>
          </Card>

          <Card className={`p-4 text-center border-2 ${earnedCertifications.length >= 3 ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${earnedCertifications.length >= 3 ? 'bg-blue-400' : 'bg-gray-200'}`}>
                <Award className={`h-6 w-6 ${earnedCertifications.length >= 3 ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-semibold text-sm">Certified Expert</h4>
              <p className="text-xs text-muted-foreground">Earn 3+ certifications</p>
              {earnedCertifications.length >= 3 && (
                <Badge className="bg-blue-400 text-blue-900 text-xs">Unlocked</Badge>
              )}
            </div>
          </Card>

          <Card className={`p-4 text-center border-2 ${stats.passRate >= 80 ? 'border-purple-400 bg-purple-50' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stats.passRate >= 80 ? 'bg-purple-400' : 'bg-gray-200'}`}>
                <Target className={`h-6 w-6 ${stats.passRate >= 80 ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-semibold text-sm">Consistent Performer</h4>
              <p className="text-xs text-muted-foreground">80%+ pass rate</p>
              {stats.passRate >= 80 && (
                <Badge className="bg-purple-400 text-purple-900 text-xs">Unlocked</Badge>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Trust Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <Award className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-bold">Industry Recognition</h3>
            <p className="text-sm text-muted-foreground">
              Certificates recognized by leading tech companies
            </p>
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <CheckCircle className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-bold">Verified Skills</h3>
            <p className="text-sm text-muted-foreground">
              Rigorous testing ensures authentic skill validation
            </p>
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <Trophy className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-bold">Career Growth</h3>
            <p className="text-sm text-muted-foreground">
              Boost your profile and unlock new opportunities
            </p>
          </div>
        </Card>
      </div>

      {/* Help Section */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Ready to showcase your skills? Browse available exams to get started.
        </p>
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
          Browse Available Exams
        </Button>
      </div>
    </div>
  );
}
