import React from 'react';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Code, Users, Award, Globe, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <CodeCredHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Coduxa</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Coduxa is a comprehensive programming certification platform designed to help developers 
            validate their skills, earn recognized certificates, and advance their careers in technology.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To democratize programming education by providing accessible, high-quality certification 
                exams that validate real-world coding skills. We believe that everyone should have the 
                opportunity to prove their programming abilities and advance their careers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's leading platform for programming certification, recognized by 
                employers globally as the standard for validating developer skills and expertise.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Coduxa Different</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Real-World Coding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our exams test actual programming skills with hands-on coding challenges, 
                  not just theoretical knowledge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Industry Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Certificates are designed to be recognized by employers and help you 
                  stand out in the job market.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Global Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join thousands of developers worldwide in our 
                  <Link to="/leaderboard" className="text-primary hover:underline"> competitive leaderboard</Link> 
                  and community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technologies We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'React', 
              'Node.js', 'SQL', 'HTML/CSS', 'Git', 'Docker', 'AWS'
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers who have already certified their skills with Coduxa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Zap className="h-4 w-4 mr-2" />
              Start Your Journey
            </Link>
            <Link 
              to="/leaderboard" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </main>

      <CodeCredFooter />
    </div>
  );
};

export default AboutPage;
