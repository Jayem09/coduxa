# Roadmap Flowchart Component

An interactive, visual roadmap component that replicates the [roadmap.sh](https://roadmap.sh/) experience with SVG-based flowcharts, node connections, and progress tracking.

## Features

### 🎯 **Interactive Flowchart Interface**

- **SVG-based Visualization**: Smooth, scalable vector graphics
- **Node-based Learning Paths**: Connected learning topics with dependencies
- **Progress Tracking**: Visual indicators for completed, in-progress, and optional topics
- **Zoom & Pan**: Full navigation control with mouse and touch support

### 🎨 **Visual Design**

- **Color-coded Nodes**: Green (completed), Yellow (in-progress), Gray (optional)
- **Connection Lines**: Solid lines for main progression, dotted for sub-topics
- **Checkmarks**: Visual completion indicators
- **Grid Background**: Professional grid overlay for better visual alignment

### 📱 **Interactive Features**

- **Clickable Nodes**: Click any topic to see details in sidebar
- **Zoom Controls**: Slider-based zoom from 50% to 200%
- **Pan Navigation**: Drag to move around the flowchart
- **Reset View**: One-click return to default view

### 📊 **Progress Tracking**

- **Completion Status**: Track completed vs remaining topics
- **Progress Bar**: Visual progress indicator
- **Statistics**: Completion percentage and estimated time remaining
- **Quick Actions**: Direct links to assessments and resources

## Roadmap Types

### **Frontend Developer Roadmap**

```
Internet → HTML → CSS → JavaScript → Version Control → VCS Hosting → Package Managers → Frameworks
```

**Main Topics:**

- **Internet**: How internet works, HTTP, DNS, hosting, browsers
- **HTML**: Basics, semantic HTML, forms, accessibility, SEO
- **CSS**: Basics, layouts, responsive design
- **JavaScript**: Basics, DOM manipulation, Fetch API
- **Version Control**: Git fundamentals
- **VCS Hosting**: GitHub, GitLab, Bitbucket
- **Package Managers**: npm, pnpm
- **Frameworks**: React, Vue.js, Angular

### **Backend Developer Roadmap**

```
Programming Language → Web Frameworks → Databases → APIs → Authentication
```

**Main Topics:**

- **Programming Language**: JavaScript, Python, Java, Go
- **Web Frameworks**: Express.js, Django, Spring Boot
- **Databases**: SQL, PostgreSQL, MongoDB, Redis
- **APIs**: REST APIs, GraphQL, API Security
- **Authentication**: JWT, OAuth, Session Authentication

## Data Structure

```typescript
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
  roadmapType:
    | "frontend"
    | "backend"
    | "fullstack"
    | "devops"
    | "mobile"
    | "ai-ml"
    | "cybersecurity"
    | "data-analyst"
    | "blockchain";
}
```

## Usage

### Basic Usage

```tsx
import RoadmapFlowchart from "./components/RoadmapFlowchart";

function App() {
  return <RoadmapFlowchart roadmapType="frontend" />;
}
```

### With Main Roadmap Component

```tsx
import Roadmap from "./components/Roadmap";

function App() {
  return <Roadmap />; // Automatically shows flowchart when roadmap is selected
}
```

## Interactive Features

### **Node Interaction**

- **Click**: Select a topic to see details in sidebar
- **Hover**: Visual feedback on interactive elements
- **Status Indicators**: Checkmarks for completed topics

### **Navigation Controls**

- **Zoom Slider**: Adjust zoom level from 50% to 200%
- **Pan**: Click and drag to move around the flowchart
- **Reset View**: Return to default zoom and position

### **Sidebar Information**

- **Selected Topic**: Details about clicked node
- **Progress Stats**: Completion percentage and remaining topics
- **Quick Actions**: Links to assessments and resources
- **Legend**: Color coding explanation

## Visual Elements

### **Node Colors**

- **Green**: Completed topics (with checkmark)
- **Yellow**: In-progress topics
- **Gray**: Optional topics
- **Border**: Solid borders for main topics, dashed for sub-topics

### **Connection Lines**

- **Solid Blue**: Main learning progression
- **Dotted Blue**: Sub-topic relationships
- **Arrow Indicators**: Direction of learning flow

### **Status Indicators**

- **Checkmark**: Completed topics
- **Circle**: In-progress or optional topics
- **Progress Bar**: Overall completion status

## Integration with Coduxa Platform

### **Exam Integration**

Each node can link to relevant Coduxa exams:

- **HTML Basics** → HTML & CSS Exam
- **JavaScript Fundamentals** → JavaScript Exam
- **React Development** → React Exam
- **Node.js** → Node.js Exam

### **Progress Tracking**

- **User Progress**: Track individual user completion
- **Database Integration**: Save progress to user profile
- **Certification**: Earn certificates upon roadmap completion

### **Resource Links**

- **Guides**: Link to detailed learning guides
- **Projects**: Connect to hands-on projects
- **External Resources**: Link to official documentation

## Customization

### Adding New Roadmaps

```typescript
const newRoadmap: RoadmapNode[] = [
  {
    id: "new-topic",
    title: "New Topic",
    position: { x: 100, y: 50 },
    level: 1,
    children: [
      {
        id: "sub-topic",
        title: "Sub Topic",
        completed: true,
        position: { x: 50, y: 100 },
        level: 2,
      },
    ],
  },
];

// Add to roadmapData object
roadmapData["new-roadmap"] = newRoadmap;
```

### Styling Customization

- **Colors**: Modify node colors in the component
- **Layout**: Adjust node positions and spacing
- **Typography**: Change font sizes and weights
- **Animations**: Add hover effects and transitions

## Technical Implementation

### **SVG Rendering**

- **Scalable Graphics**: Vector-based for crisp display at any zoom level
- **Performance**: Efficient rendering of complex node structures
- **Accessibility**: Proper ARIA labels and keyboard navigation

### **State Management**

- **React Hooks**: useState for component state
- **Event Handling**: Mouse and touch event management
- **Ref Management**: Direct SVG manipulation

### **Responsive Design**

- **Mobile Support**: Touch-friendly interactions
- **Flexible Layout**: Adapts to different screen sizes
- **Sidebar**: Collapsible on smaller screens

## Browser Support

- **Chrome 90+**: Full support with all features
- **Firefox 88+**: Complete functionality
- **Safari 14+**: Full feature support
- **Edge 90+**: Complete compatibility

## Performance

- **Optimized Rendering**: Efficient SVG updates
- **Smooth Interactions**: 60fps animations
- **Memory Management**: Proper cleanup of event listeners
- **Lazy Loading**: Load roadmap data on demand

## Future Enhancements

- [ ] **Animation**: Smooth transitions between states
- [ ] **Search**: Find specific topics in the flowchart
- [ ] **Filtering**: Show/hide completed or optional topics
- [ ] **Export**: Save roadmap as image or PDF
- [ ] **Collaboration**: Share progress with mentors
- [ ] **Mobile App**: Native mobile experience
- [ ] **Offline Mode**: Download roadmaps for offline use
- [ ] **AI Recommendations**: Personalized learning paths
- [ ] **Gamification**: Points and achievements
- [ ] **Social Features**: Study groups and discussions

## Inspiration

This component replicates the experience of [roadmap.sh](https://roadmap.sh/), which features:

- **Interactive Flowcharts**: Visual learning paths
- **Progress Tracking**: Completion indicators
- **Professional Design**: Clean, modern interface
- **Comprehensive Coverage**: All major tech domains

Our implementation brings this same level of visual learning guidance to the Coduxa platform, perfectly integrated with our exam system and progress tracking.
