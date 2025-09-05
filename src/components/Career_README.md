# Career Component

A comprehensive career center component that provides job listings, career paths, and career guidance for developers.

## Features

### 🎯 **Job Listings**

- **Real-time job search** with filtering by type (full-time, part-time, contract, internship)
- **Detailed job information** including salary, location, requirements, and benefits
- **Featured job highlighting** for premium positions
- **Remote work indicators** for flexible positions
- **Company information** with logos and descriptions

### 🛤️ **Career Paths**

- **6 comprehensive career paths** covering different tech roles:
  - Frontend Developer
  - Backend Developer
  - Full Stack Developer
  - Mobile Developer
  - Data Scientist
  - DevOps Engineer
- **Skill requirements** and learning duration for each path
- **Salary expectations** and growth projections
- **Difficulty levels** (beginner, intermediate, advanced)

### 📚 **Career Guidance**

- **Expert articles** on resume writing, interviews, networking, and skills
- **Categorized content** for easy navigation
- **Reading time estimates** and author information
- **Professional development tips** and industry insights

### 📊 **Statistics Dashboard**

- **Active job count** (1,247 jobs)
- **Available career paths** (12 paths)
- **Average salary** ($95K)
- **Success rate** (87%)

## Component Structure

```typescript
interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
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
  difficulty: "beginner" | "intermediate" | "advanced";
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
  category: "resume" | "interview" | "networking" | "skills";
  readTime: string;
  author: string;
  publishedDate: string;
}
```

## Usage

```tsx
import Career from "./components/Career";

function App() {
  return (
    <div>
      <Career />
    </div>
  );
}
```

## Features

### Search and Filtering

- **Global search** across jobs, career paths, and guidance
- **Job type filtering** (full-time, part-time, contract, internship)
- **Difficulty level filtering** for career paths
- **Real-time results** as you type

### Responsive Design

- **Mobile-first approach** with responsive grid layouts
- **Adaptive navigation** with collapsible sections
- **Touch-friendly** buttons and interactions
- **Optimized for all screen sizes**

### Interactive Elements

- **Tabbed navigation** between jobs, paths, and guidance
- **Expandable job details** with requirements and benefits
- **Career path exploration** with skill breakdowns
- **Call-to-action buttons** for engagement

## Styling

The component uses Tailwind CSS classes and follows the design system:

- **Color scheme**: Blue, green, purple, and yellow accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Icons**: Lucide React icons for consistency

## Data Sources

Currently uses mock data, but designed to integrate with:

- **Job board APIs** (LinkedIn, Indeed, Glassdoor)
- **Career guidance content** from industry experts
- **Real-time salary data** from compensation databases
- **User progress tracking** for career path completion

## Future Enhancements

- **Real job API integration** with live job postings
- **User profile matching** for personalized recommendations
- **Application tracking** for applied jobs
- **Career progress tracking** with milestones
- **Company reviews** and ratings
- **Salary negotiation tips** and tools
- **Interview preparation** with mock interviews
- **Networking events** and meetup integration

## Testing

The component includes comprehensive unit tests covering:

- **Component rendering** and basic functionality
- **Search and filtering** behavior
- **Tab navigation** and content switching
- **Data display** and formatting
- **Interactive elements** and user interactions

Run tests with:

```bash
npm run test:run -- src/components/__tests__/Career.simple.test.tsx
```

## Accessibility

- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** color schemes
- **Focus indicators** for interactive elements
- **Semantic HTML** structure
- **ARIA labels** for complex interactions

## Performance

- **Lazy loading** for large job lists
- **Virtual scrolling** for better performance
- **Memoized components** to prevent unnecessary re-renders
- **Optimized images** and icons
- **Efficient state management** with minimal re-renders
