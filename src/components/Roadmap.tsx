import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Search, 
  Code, 
  Globe, 
  Server, 
  Database, 
  Smartphone, 
  Brain, 
  Shield, 
  BarChart3,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import RoadmapFlowchart from './RoadmapFlowchart';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  resources: {
    type: 'exam' | 'guide' | 'project' | 'external';
    title: string;
    url?: string;
    examId?: string;
  }[];
  completed?: boolean;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'role' | 'skill';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  items: RoadmapItem[];
  color: string;
  popular?: boolean;
}

const roadmaps: Roadmap[] = [
  // Role-based Roadmaps
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Learn modern frontend development with React, Vue, and modern tooling',
    icon: Globe,
    category: 'role',
    difficulty: 'intermediate',
    estimatedDuration: '6-12 months',
    color: 'bg-blue-100 text-blue-800',
    popular: true,
    items: [
      {
        id: 'html-css',
        title: 'HTML & CSS Fundamentals',
        description: 'Master the building blocks of web development',
        difficulty: 'beginner',
        estimatedTime: '2-4 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'HTML & CSS Exam', examId: 'html-css' },
          { type: 'guide', title: 'CSS Grid & Flexbox Guide' },
          { type: 'project', title: 'Build a Portfolio Website' }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript Fundamentals',
        description: 'Learn modern JavaScript ES6+ features and best practices',
        difficulty: 'beginner',
        estimatedTime: '4-6 weeks',
        prerequisites: ['html-css'],
        resources: [
          { type: 'exam', title: 'JavaScript Fundamentals Exam', examId: 'javascript' },
          { type: 'guide', title: 'JavaScript Best Practices' },
          { type: 'project', title: 'Interactive Web App' }
        ]
      },
      {
        id: 'react',
        title: 'React Development',
        description: 'Build dynamic user interfaces with React',
        difficulty: 'intermediate',
        estimatedTime: '6-8 weeks',
        prerequisites: ['javascript'],
        resources: [
          { type: 'exam', title: 'React Development Exam', examId: 'react' },
          { type: 'guide', title: 'React Hooks & State Management' },
          { type: 'project', title: 'Full-Stack React Application' }
        ]
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        description: 'Add type safety to your JavaScript applications',
        difficulty: 'intermediate',
        estimatedTime: '3-4 weeks',
        prerequisites: ['javascript', 'react'],
        resources: [
          { type: 'exam', title: 'TypeScript Exam', examId: 'typescript' },
          { type: 'guide', title: 'TypeScript Best Practices' },
          { type: 'project', title: 'TypeScript React App' }
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Master server-side development with Node.js, databases, and APIs',
    icon: Server,
    category: 'role',
    difficulty: 'intermediate',
    estimatedDuration: '8-12 months',
    color: 'bg-green-100 text-green-800',
    popular: true,
    items: [
      {
        id: 'nodejs',
        title: 'Node.js & Express',
        description: 'Build scalable server-side applications',
        difficulty: 'intermediate',
        estimatedTime: '6-8 weeks',
        prerequisites: ['javascript'],
        resources: [
          { type: 'exam', title: 'Node.js Development Exam', examId: 'nodejs' },
          { type: 'guide', title: 'Express.js Best Practices' },
          { type: 'project', title: 'RESTful API Development' }
        ]
      },
      {
        id: 'database',
        title: 'Database Design & SQL',
        description: 'Master database design and SQL queries',
        difficulty: 'intermediate',
        estimatedTime: '4-6 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'SQL Fundamentals Exam', examId: 'sql' },
          { type: 'guide', title: 'Database Design Principles' },
          { type: 'project', title: 'Database-Driven Application' }
        ]
      },
      {
        id: 'api-design',
        title: 'API Design & Security',
        description: 'Design secure and scalable APIs',
        difficulty: 'advanced',
        estimatedTime: '4-5 weeks',
        prerequisites: ['nodejs', 'database'],
        resources: [
          { type: 'exam', title: 'API Security Exam', examId: 'security' },
          { type: 'guide', title: 'RESTful API Design' },
          { type: 'project', title: 'Secure API with Authentication' }
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend development',
    icon: Code,
    category: 'role',
    difficulty: 'advanced',
    estimatedDuration: '12-18 months',
    color: 'bg-purple-100 text-purple-800',
    popular: true,
    items: [
      {
        id: 'system-design',
        title: 'System Design',
        description: 'Design scalable and efficient systems',
        difficulty: 'advanced',
        estimatedTime: '8-10 weeks',
        prerequisites: ['frontend', 'backend'],
        resources: [
          { type: 'exam', title: 'System Design Exam', examId: 'system-design' },
          { type: 'guide', title: 'Scalable Architecture Patterns' },
          { type: 'project', title: 'Microservices Application' }
        ]
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Master deployment, automation, and infrastructure',
    icon: Database,
    category: 'role',
    difficulty: 'advanced',
    estimatedDuration: '10-14 months',
    color: 'bg-orange-100 text-orange-800',
    items: [
      {
        id: 'docker',
        title: 'Docker & Containerization',
        description: 'Containerize applications for deployment',
        difficulty: 'intermediate',
        estimatedTime: '3-4 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'Docker Fundamentals Exam', examId: 'docker' },
          { type: 'guide', title: 'Docker Best Practices' },
          { type: 'project', title: 'Containerized Application' }
        ]
      },
      {
        id: 'aws',
        title: 'Cloud Computing (AWS)',
        description: 'Deploy and manage applications on AWS',
        difficulty: 'advanced',
        estimatedTime: '6-8 weeks',
        prerequisites: ['docker'],
        resources: [
          { type: 'exam', title: 'AWS Fundamentals Exam', examId: 'aws' },
          { type: 'guide', title: 'AWS Architecture Patterns' },
          { type: 'project', title: 'Cloud-Native Application' }
        ]
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    description: 'Build native and cross-platform mobile applications',
    icon: Smartphone,
    category: 'role',
    difficulty: 'intermediate',
    estimatedDuration: '8-12 months',
    color: 'bg-pink-100 text-pink-800',
    items: [
      {
        id: 'react-native',
        title: 'React Native',
        description: 'Build cross-platform mobile apps with React',
        difficulty: 'intermediate',
        estimatedTime: '6-8 weeks',
        prerequisites: ['react'],
        resources: [
          { type: 'exam', title: 'React Native Exam', examId: 'react-native' },
          { type: 'guide', title: 'Mobile App Development' },
          { type: 'project', title: 'Cross-Platform Mobile App' }
        ]
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineer',
    description: 'Master artificial intelligence and machine learning',
    icon: Brain,
    category: 'role',
    difficulty: 'advanced',
    estimatedDuration: '12-18 months',
    color: 'bg-indigo-100 text-indigo-800',
    items: [
      {
        id: 'python-ml',
        title: 'Python for Machine Learning',
        description: 'Learn Python and ML libraries',
        difficulty: 'intermediate',
        estimatedTime: '6-8 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'Python Fundamentals Exam', examId: 'python' },
          { type: 'exam', title: 'Machine Learning Exam', examId: 'ml' },
          { type: 'guide', title: 'ML Algorithms Guide' },
          { type: 'project', title: 'ML Model Development' }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Specialist',
    description: 'Protect systems and data from security threats',
    icon: Shield,
    category: 'role',
    difficulty: 'advanced',
    estimatedDuration: '10-14 months',
    color: 'bg-red-100 text-red-800',
    items: [
      {
        id: 'security-fundamentals',
        title: 'Security Fundamentals',
        description: 'Learn core security concepts and practices',
        difficulty: 'intermediate',
        estimatedTime: '4-6 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'Cybersecurity Fundamentals Exam', examId: 'security' },
          { type: 'guide', title: 'Security Best Practices' },
          { type: 'project', title: 'Security Assessment Project' }
        ]
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Analyze data to drive business decisions',
    icon: BarChart3,
    category: 'role',
    difficulty: 'intermediate',
    estimatedDuration: '6-10 months',
    color: 'bg-teal-100 text-teal-800',
    items: [
      {
        id: 'sql-analytics',
        title: 'SQL for Analytics',
        description: 'Master SQL for data analysis',
        difficulty: 'intermediate',
        estimatedTime: '4-6 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'SQL Analytics Exam', examId: 'sql' },
          { type: 'guide', title: 'Data Analysis with SQL' },
          { type: 'project', title: 'Business Intelligence Dashboard' }
        ]
      }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain Developer',
    description: 'Build decentralized applications and smart contracts',
    icon: Shield,
    category: 'role',
    difficulty: 'advanced',
    estimatedDuration: '10-14 months',
    color: 'bg-yellow-100 text-yellow-800',
    items: [
      {
        id: 'blockchain-fundamentals',
        title: 'Blockchain Fundamentals',
        description: 'Understand blockchain technology and cryptocurrencies',
        difficulty: 'intermediate',
        estimatedTime: '4-6 weeks',
        prerequisites: [],
        resources: [
          { type: 'exam', title: 'Blockchain Fundamentals Exam', examId: 'blockchain' },
          { type: 'guide', title: 'Smart Contract Development' },
          { type: 'project', title: 'DeFi Application' }
        ]
      }
    ]
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};


const Roadmap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'role' | 'skill'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || roadmap.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleStartRoadmap = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
  };

  const handleBackToRoadmaps = () => {
    setSelectedRoadmap(null);
  };

  if (selectedRoadmap) {
    // Map roadmap IDs to flowchart types
    const roadmapTypeMap: Record<string, any> = {
      'frontend': 'frontend',
      'backend': 'backend',
      'fullstack': 'fullstack',
      'devops': 'devops',
      'mobile': 'mobile',
      'ai-ml': 'ai-ml',
      'cybersecurity': 'cybersecurity',
      'data-analyst': 'data-analyst',
      'blockchain': 'blockchain'
    };

    const flowchartType = roadmapTypeMap[selectedRoadmap.id] || 'frontend';

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="outline"
              onClick={handleBackToRoadmaps}
              className="mb-4"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Roadmaps
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${selectedRoadmap.color}`}>
                <selectedRoadmap.icon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedRoadmap.title}</h1>
                <p className="text-gray-600">{selectedRoadmap.description}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Badge className={difficultyColors[selectedRoadmap.difficulty]}>
                {selectedRoadmap.difficulty.charAt(0).toUpperCase() + selectedRoadmap.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {selectedRoadmap.estimatedDuration}
              </Badge>
              {selectedRoadmap.popular && (
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Flowchart */}
        <RoadmapFlowchart roadmapType={flowchartType} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Developer Roadmaps
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your path and guide your learning journey. Our roadmaps are designed by industry experts 
            to help you master the skills needed for your dream career in tech.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Roadmaps</TabsTrigger>
              <TabsTrigger value="role">Role-based</TabsTrigger>
              <TabsTrigger value="skill">Skill-based</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('all')}
            >
              All Levels
            </Button>
            <Button
              variant={selectedDifficulty === 'beginner' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('beginner')}
            >
              Beginner
            </Button>
            <Button
              variant={selectedDifficulty === 'intermediate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('intermediate')}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedDifficulty === 'advanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('advanced')}
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}-based`}
            {selectedDifficulty !== 'all' && ` at ${selectedDifficulty} level`}
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => (
            <Card key={roadmap.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${roadmap.color}`}>
                    <roadmap.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {roadmap.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={difficultyColors[roadmap.difficulty]}>
                        {roadmap.difficulty}
                      </Badge>
                      {roadmap.popular && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {roadmap.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {roadmap.estimatedDuration}
                  </div>
                  <div className="text-sm text-gray-500">
                    {roadmap.items.length} steps
                  </div>
                </div>

                <Button 
                  onClick={() => handleStartRoadmap(roadmap)}
                  className="w-full group-hover:bg-blue-600 transition-colors"
                >
                  Start Roadmap
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No roadmaps found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Community Stats */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Join the Learning Community
              </h3>
              <p className="text-gray-600 mb-4">
                Follow structured learning paths and track your progress with thousands of developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Guides
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
