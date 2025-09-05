import React, { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Map,
  Globe,
  Code,
  Database,
  Smartphone,
  Brain,
  Shield,
  BarChart3,
  Server
} from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  optional?: boolean;
  children?: RoadmapNode[];
  position: { x: number; y: number };
  level: number;
}

interface RoadmapFlowchartProps {
  roadmapType: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'mobile' | 'ai-ml' | 'cybersecurity' | 'data-analyst' | 'blockchain';
}

const roadmapData: Record<string, RoadmapNode[]> = {
  frontend: [
    {
      id: 'internet',
      title: 'Internet',
      position: { x: 100, y: 50 },
      level: 1,
      children: [
        { id: 'how-internet-works', title: 'How does the internet work?', completed: true, position: { x: 50, y: 100 }, level: 2 },
        { id: 'what-is-http', title: 'What is HTTP?', completed: true, position: { x: 150, y: 100 }, level: 2 },
        { id: 'domain-name', title: 'What is Domain Name?', completed: true, position: { x: 250, y: 100 }, level: 2 },
        { id: 'hosting', title: 'What is hosting?', completed: true, position: { x: 350, y: 100 }, level: 2 },
        { id: 'dns', title: 'DNS and how it works?', completed: true, position: { x: 450, y: 100 }, level: 2 },
        { id: 'browsers', title: 'Browsers and how they work?', completed: true, position: { x: 550, y: 100 }, level: 2 }
      ]
    },
    {
      id: 'html',
      title: 'HTML',
      position: { x: 100, y: 200 },
      level: 1,
      children: [
        { id: 'html-basics', title: 'Learn the basics', completed: true, position: { x: 50, y: 250 }, level: 2 },
        { id: 'semantic-html', title: 'Writing Semantic HTML', completed: true, position: { x: 150, y: 250 }, level: 2 },
        { id: 'forms', title: 'Forms and Validations', completed: true, position: { x: 250, y: 250 }, level: 2 },
        { id: 'accessibility', title: 'Accessibility', completed: true, position: { x: 350, y: 250 }, level: 2 },
        { id: 'seo-basics', title: 'SEO Basics', completed: false, optional: true, position: { x: 450, y: 250 }, level: 2 }
      ]
    },
    {
      id: 'css',
      title: 'CSS',
      position: { x: 100, y: 350 },
      level: 1,
      children: [
        { id: 'css-basics', title: 'Learn the basics', completed: true, position: { x: 50, y: 400 }, level: 2 },
        { id: 'layouts', title: 'Making Layouts', completed: true, position: { x: 150, y: 400 }, level: 2 },
        { id: 'responsive', title: 'Responsive Design', completed: true, position: { x: 250, y: 400 }, level: 2 }
      ]
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      position: { x: 100, y: 500 },
      level: 1,
      children: [
        { id: 'js-basics', title: 'Learn the basics', completed: true, position: { x: 50, y: 550 }, level: 2 },
        { id: 'dom-manipulation', title: 'Learn DOM Manipulation', completed: true, position: { x: 150, y: 550 }, level: 2 },
        { id: 'fetch-api', title: 'Fetch API / Ajax (XHR)', completed: true, position: { x: 250, y: 550 }, level: 2 }
      ]
    },
    {
      id: 'version-control',
      title: 'Version Control Systems',
      position: { x: 100, y: 650 },
      level: 1,
      children: [
        { id: 'git', title: 'Git', completed: true, position: { x: 100, y: 700 }, level: 2 }
      ]
    },
    {
      id: 'vcs-hosting',
      title: 'VCS Hosting',
      position: { x: 100, y: 800 },
      level: 1,
      children: [
        { id: 'github', title: 'GitHub', completed: true, position: { x: 50, y: 850 }, level: 2 },
        { id: 'gitlab', title: 'GitLab', completed: true, position: { x: 150, y: 850 }, level: 2 },
        { id: 'bitbucket', title: 'Bitbucket', completed: true, position: { x: 250, y: 850 }, level: 2 }
      ]
    },
    {
      id: 'package-managers',
      title: 'Package Managers',
      position: { x: 100, y: 950 },
      level: 1,
      children: [
        { id: 'npm', title: 'npm', completed: true, position: { x: 50, y: 1000 }, level: 2 },
        { id: 'pnpm', title: 'pnpm', completed: true, position: { x: 150, y: 1000 }, level: 2 }
      ]
    },
    {
      id: 'frameworks',
      title: 'Frontend Frameworks',
      position: { x: 300, y: 950 },
      level: 1,
      children: [
        { id: 'react', title: 'React', completed: true, position: { x: 250, y: 1000 }, level: 2 },
        { id: 'vue', title: 'Vue.js', completed: true, position: { x: 350, y: 1000 }, level: 2 },
        { id: 'angular', title: 'Angular', completed: false, position: { x: 450, y: 1000 }, level: 2 }
      ]
    }
  ],
  backend: [
    {
      id: 'programming-language',
      title: 'Programming Language',
      position: { x: 100, y: 50 },
      level: 1,
      children: [
        { id: 'javascript', title: 'JavaScript', completed: true, position: { x: 50, y: 100 }, level: 2 },
        { id: 'python', title: 'Python', completed: true, position: { x: 150, y: 100 }, level: 2 },
        { id: 'java', title: 'Java', completed: false, position: { x: 250, y: 100 }, level: 2 },
        { id: 'go', title: 'Go', completed: false, position: { x: 350, y: 100 }, level: 2 }
      ]
    },
    {
      id: 'web-frameworks',
      title: 'Web Frameworks',
      position: { x: 100, y: 200 },
      level: 1,
      children: [
        { id: 'express', title: 'Express.js', completed: true, position: { x: 50, y: 250 }, level: 2 },
        { id: 'django', title: 'Django', completed: false, position: { x: 150, y: 250 }, level: 2 },
        { id: 'spring', title: 'Spring Boot', completed: false, position: { x: 250, y: 250 }, level: 2 }
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      position: { x: 100, y: 350 },
      level: 1,
      children: [
        { id: 'sql', title: 'SQL', completed: true, position: { x: 50, y: 400 }, level: 2 },
        { id: 'postgresql', title: 'PostgreSQL', completed: true, position: { x: 150, y: 400 }, level: 2 },
        { id: 'mongodb', title: 'MongoDB', completed: false, position: { x: 250, y: 400 }, level: 2 },
        { id: 'redis', title: 'Redis', completed: false, position: { x: 350, y: 400 }, level: 2 }
      ]
    },
    {
      id: 'apis',
      title: 'APIs',
      position: { x: 100, y: 500 },
      level: 1,
      children: [
        { id: 'rest', title: 'REST APIs', completed: true, position: { x: 50, y: 550 }, level: 2 },
        { id: 'graphql', title: 'GraphQL', completed: false, position: { x: 150, y: 550 }, level: 2 },
        { id: 'api-security', title: 'API Security', completed: false, position: { x: 250, y: 550 }, level: 2 }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication',
      position: { x: 100, y: 650 },
      level: 1,
      children: [
        { id: 'jwt', title: 'JWT', completed: true, position: { x: 50, y: 700 }, level: 2 },
        { id: 'oauth', title: 'OAuth', completed: false, position: { x: 150, y: 700 }, level: 2 },
        { id: 'session-auth', title: 'Session Authentication', completed: false, position: { x: 250, y: 700 }, level: 2 }
      ]
    }
  ]
};

const RoadmapFlowchart: React.FC<RoadmapFlowchartProps> = ({ roadmapType }) => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const roadmap = roadmapData[roadmapType] || roadmapData.frontend;

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderNode = (node: RoadmapNode) => {
    const isCompleted = node.completed;
    const isOptional = node.optional;
    
    return (
      <g key={node.id}>
        {/* Node */}
        <rect
          x={node.position.x - 60}
          y={node.position.y - 15}
          width={120}
          height={30}
          rx={5}
          fill={isCompleted ? "#10b981" : isOptional ? "#f3f4f6" : "#fbbf24"}
          stroke={isCompleted ? "#059669" : isOptional ? "#9ca3af" : "#f59e0b"}
          strokeWidth={2}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNodeClick(node)}
        />
        
        {/* Node Text */}
        <text
          x={node.position.x}
          y={node.position.y + 5}
          textAnchor="middle"
          fontSize="12"
          fill={isCompleted ? "white" : isOptional ? "#6b7280" : "#92400e"}
          className="pointer-events-none select-none"
          fontWeight="500"
        >
          {node.title}
        </text>

        {/* Checkmark */}
        {isCompleted && (
          <circle
            cx={node.position.x + 45}
            cy={node.position.y - 5}
            r={8}
            fill="#10b981"
            stroke="white"
            strokeWidth={2}
          />
        )}
        
        {isCompleted && (
          <path
            d={`M ${node.position.x + 40} ${node.position.y - 5} L ${node.position.x + 43} ${node.position.y - 2} L ${node.position.x + 50} ${node.position.y - 8}`}
            stroke="white"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Optional indicator */}
        {isOptional && !isCompleted && (
          <circle
            cx={node.position.x + 45}
            cy={node.position.y - 5}
            r={8}
            fill="#f3f4f6"
            stroke="#9ca3af"
            strokeWidth={2}
          />
        )}

        {/* Render children */}
        {node.children?.map(child => (
          <g key={child.id}>
            {/* Connection line */}
            <line
              x1={node.position.x}
              y1={node.position.y + 15}
              x2={child.position.x}
              y2={child.position.y - 15}
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray={node.level === 1 ? "0" : "5,5"}
            />
            {renderNode(child)}
          </g>
        ))}
      </g>
    );
  };

  const getRoadmapIcon = () => {
    switch (roadmapType) {
      case 'frontend': return Globe;
      case 'backend': return Server;
      case 'fullstack': return Code;
      case 'devops': return Database;
      case 'mobile': return Smartphone;
      case 'ai-ml': return Brain;
      case 'cybersecurity': return Shield;
      case 'data-analyst': return BarChart3;
      case 'blockchain': return Shield;
      default: return Map;
    }
  };

  const getRoadmapTitle = () => {
    switch (roadmapType) {
      case 'frontend': return 'Frontend Developer';
      case 'backend': return 'Backend Developer';
      case 'fullstack': return 'Full Stack Developer';
      case 'devops': return 'DevOps Engineer';
      case 'mobile': return 'Mobile Developer';
      case 'ai-ml': return 'AI/ML Engineer';
      case 'cybersecurity': return 'Cybersecurity Specialist';
      case 'data-analyst': return 'Data Analyst';
      case 'blockchain': return 'Blockchain Developer';
      default: return 'Developer Roadmap';
    }
  };

  const IconComponent = getRoadmapIcon();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getRoadmapTitle()}</h1>
              <p className="text-gray-600">Interactive learning roadmap</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Zoom:</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
            >
              Reset View
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Flowchart */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="w-full h-screen bg-white"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 800 1200"
              className="cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: '0 0'
              }}
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Render all nodes */}
              {roadmap.map(node => renderNode(node))}
            </svg>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Legend */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span className="text-sm text-gray-600">Optional</span>
                </div>
              </div>
            </div>

            {/* Selected Node Details */}
            {selectedNode && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Topic</h3>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{selectedNode.title}</h4>
                    {selectedNode.description && (
                      <p className="text-sm text-gray-600 mb-3">{selectedNode.description}</p>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      {selectedNode.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Circle className="h-3 w-3 mr-1" />
                          Not Started
                        </Badge>
                      )}
                      {selectedNode.optional && (
                        <Badge variant="secondary">Optional</Badge>
                      )}
                    </div>
                    <Button size="sm" className="w-full">
                      Start Learning
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Progress Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completed</span>
                    <span className="text-gray-900">12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• 80% Complete</p>
                  <p>• 3 topics remaining</p>
                  <p>• Estimated 2 weeks left</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Take Assessment
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  View Resources
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Join Study Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapFlowchart;
