import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  TrendingUp,
  Star,
  Filter,
  Search,
  ExternalLink,
  BookOpen,
  Target,
  Award,
  Zap,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Shield,
  Server,
  ChevronRight,
  Calendar,
  User,
  GraduationCap,
  Lightbulb
} from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  companyLogo?: string;
  remote: boolean;
  featured: boolean;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  jobs: string[];
  salary: string;
  growth: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface CareerGuidance {
  id: string;
  title: string;
  content: string;
  category: 'resume' | 'interview' | 'networking' | 'skills';
  readTime: string;
  author: string;
  publishedDate: string;
}

const mockJobListings: JobListing[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$120,000 - $160,000',
    experience: '5+ years',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong knowledge of modern CSS and responsive design',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, Cypress)',
      'Experience with CI/CD pipelines'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget'
    ],
    postedDate: '2024-01-15',
    remote: true,
    featured: true
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'full-time',
    salary: '$90,000 - $130,000',
    experience: '3+ years',
    description: 'Join our fast-growing startup as a Full Stack Developer. You will work on both frontend and backend development, building scalable web applications.',
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in React, Node.js, and PostgreSQL',
      'Experience with cloud platforms (AWS, GCP)',
      'Strong problem-solving skills',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Equity participation',
      'Health insurance',
      'Flexible PTO',
      'Learning and development opportunities',
      'Team building events'
    ],
    postedDate: '2024-01-14',
    remote: false,
    featured: false
  },
  {
    id: '3',
    title: 'React Developer Intern',
    company: 'BigTech Solutions',
    location: 'Seattle, WA',
    type: 'internship',
    salary: '$25 - $35/hour',
    experience: '0-1 years',
    description: 'Great opportunity for students and recent graduates to gain hands-on experience with React development in a professional environment.',
    requirements: [
      'Basic knowledge of React and JavaScript',
      'Understanding of HTML/CSS',
      'Currently enrolled in CS or related field',
      'Strong communication skills',
      'Eagerness to learn'
    ],
    benefits: [
      'Mentorship program',
      'Networking opportunities',
      'Potential full-time offer',
      'Flexible schedule',
      'Learning resources'
    ],
    postedDate: '2024-01-13',
    remote: true,
    featured: false
  }
];

const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Build user interfaces and user experiences for web applications using modern frameworks and tools.',
    duration: '6-12 months',
    difficulty: 'intermediate',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    jobs: ['Frontend Developer', 'UI Developer', 'React Developer'],
    salary: '$70,000 - $120,000',
    growth: '+15% annually',
    icon: Code,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: '2',
    title: 'Backend Developer',
    description: 'Develop server-side applications, APIs, and databases to power web and mobile applications.',
    duration: '8-15 months',
    difficulty: 'intermediate',
    skills: ['Node.js', 'Python', 'SQL', 'APIs', 'Database Design'],
    jobs: ['Backend Developer', 'API Developer', 'Server Developer'],
    salary: '$75,000 - $130,000',
    growth: '+12% annually',
    icon: Server,
    color: 'bg-green-100 text-green-800'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend development to build complete web applications from scratch.',
    duration: '12-18 months',
    difficulty: 'advanced',
    skills: ['React', 'Node.js', 'Database', 'DevOps', 'Cloud'],
    jobs: ['Full Stack Developer', 'Software Engineer', 'Tech Lead'],
    salary: '$85,000 - $150,000',
    growth: '+18% annually',
    icon: Globe,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: '4',
    title: 'Mobile Developer',
    description: 'Create mobile applications for iOS and Android using modern development frameworks.',
    duration: '6-10 months',
    difficulty: 'intermediate',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI'],
    jobs: ['Mobile Developer', 'iOS Developer', 'Android Developer'],
    salary: '$80,000 - $140,000',
    growth: '+20% annually',
    icon: Smartphone,
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: '5',
    title: 'Data Scientist',
    description: 'Analyze data to extract insights and build machine learning models for business applications.',
    duration: '12-24 months',
    difficulty: 'advanced',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    jobs: ['Data Scientist', 'ML Engineer', 'Data Analyst'],
    salary: '$90,000 - $160,000',
    growth: '+25% annually',
    icon: Brain,
    color: 'bg-pink-100 text-pink-800'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    description: 'Manage infrastructure, deployment pipelines, and ensure reliable software delivery.',
    duration: '10-16 months',
    difficulty: 'advanced',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Monitoring'],
    jobs: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'],
    salary: '$95,000 - $170,000',
    growth: '+22% annually',
    icon: Shield,
    color: 'bg-indigo-100 text-indigo-800'
  }
];

const mockCareerGuidance: CareerGuidance[] = [
  {
    id: '1',
    title: 'How to Write a Standout Developer Resume',
    content: 'Learn the essential elements of a compelling developer resume that gets you noticed by hiring managers.',
    category: 'resume',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    publishedDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'Ace Your Technical Interview: Common Questions & Answers',
    content: 'Master the most common technical interview questions and learn how to approach coding challenges.',
    category: 'interview',
    readTime: '12 min read',
    author: 'Mike Chen',
    publishedDate: '2024-01-08'
  },
  {
    id: '3',
    title: 'Building Your Professional Network in Tech',
    content: 'Discover effective strategies for networking in the tech industry and building meaningful connections.',
    category: 'networking',
    readTime: '6 min read',
    author: 'Emily Rodriguez',
    publishedDate: '2024-01-05'
  },
  {
    id: '4',
    title: 'Essential Skills Every Developer Should Learn in 2024',
    content: 'Stay ahead of the curve with the most in-demand skills and technologies in software development.',
    category: 'skills',
    readTime: '10 min read',
    author: 'David Kim',
    publishedDate: '2024-01-03'
  }
];

const jobTypeColors = {
  'full-time': 'bg-green-100 text-green-800',
  'part-time': 'bg-blue-100 text-blue-800',
  'contract': 'bg-yellow-100 text-yellow-800',
  'internship': 'bg-purple-100 text-purple-800'
};

const difficultyColors = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800',
  'advanced': 'bg-red-100 text-red-800'
};

const categoryIcons = {
  'resume': BookOpen,
  'interview': Target,
  'networking': Users,
  'skills': Zap
};

const Career: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'jobs' | 'paths' | 'guidance'>('jobs');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const filteredJobs = mockJobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedJobType === 'all' || job.type === selectedJobType;
    return matchesSearch && matchesType;
  });

  const filteredPaths = mockCareerPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || path.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const filteredGuidance = mockCareerGuidance.filter(guide => {
    return guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           guide.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Career Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover job opportunities, explore career paths, and get expert guidance to advance your tech career.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Career Paths</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Salary</p>
                  <p className="text-2xl font-bold text-gray-900">$95K</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, career paths, or guidance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="paths" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Career Paths
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Career Guidance
            </TabsTrigger>
          </TabsList>

          {/* Job Listings Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Positions ({filteredJobs.length})
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className={`${job.featured ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          {job.featured && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                            {job.remote && <span className="text-green-600">(Remote)</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(job.postedDate)}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{job.description}</p>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className={jobTypeColors[job.type]}>
                            {job.type.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      <Button className="ml-4">
                        Apply Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-1 text-gray-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-1 text-gray-400" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Career Paths ({filteredPaths.length})
              </h2>
              <Button variant="outline" size="sm">
                <GraduationCap className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path) => {
                const IconComponent = path.icon;
                return (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${path.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                          <Badge className={difficultyColors[path.difficulty]}>
                            {path.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{path.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          Duration: {path.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          Salary: {path.salary}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4" />
                          Growth: {path.growth}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full">
                        Explore Path
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Career Guidance Tab */}
          <TabsContent value="guidance" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Career Guidance ({filteredGuidance.length})
              </h2>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredGuidance.map((guide) => {
                const IconComponent = categoryIcons[guide.category];
                return (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>{guide.readTime}</span>
                            <span>By {guide.author}</span>
                            <span>{formatDate(guide.publishedDate)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{guide.content}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {guide.category}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Read More
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Advance Your Career?</h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of developers who have successfully transitioned into tech careers with our comprehensive learning paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Career;
