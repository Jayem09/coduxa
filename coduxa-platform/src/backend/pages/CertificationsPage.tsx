// src/backend/pages/CertificationsPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Award, 
  Trophy, 
  Target, 
  CheckCircle,
  Clock,
  Users,
  Star
} from "lucide-react";

const certificationStats = [
  {
    title: "Total Certifications",
    value: "0",
    description: "Successfully completed certifications",
    icon: Award,
    color: "text-blue-500"
  },
  {
    title: "Highest Score",
    value: "0%",
    description: "Your best performance",
    icon: Trophy,
    color: "text-yellow-500"
  },
  {
    title: "Average Score", 
    value: "0%",
    description: "Average score across all certifications",
    icon: Target,
    color: "text-green-500"
  },
];

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
  return (
<div className="p-5 max-w-8xl mx-auto space-y-10">
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Certifications</h2>
            <p className="text-muted-foreground">
              View and manage your earned certifications
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">No certifications yet</p>
            <p className="text-sm text-muted-foreground">
              Take an exam to earn your first certification
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {certificationStats.map((stat) => (
          <Card key={stat.title} className="relative border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">{stat.title}</CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Exams */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Available Exams</h3>
          <Button variant="outline" size="sm">
            View All Exams
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {availableExams.map((exam) => (
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
                >
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          ))}
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
