# Feedback Component

A comprehensive feedback system for collecting, managing, and displaying user feedback in the Coduxa platform.

## Features

### 📝 **Send Feedback**
- **Comprehensive form** with name, email, subject, message, category, priority, and rating
- **Category selection**: Bug report, feature request, improvement, general feedback, complaint
- **Priority levels**: Low, medium, high, urgent
- **5-star rating system** for user satisfaction
- **Form validation** with required fields
- **Auto-capture** of user agent and page URL for context

### 📊 **View Feedback**
- **Real-time feedback list** with search and filtering capabilities
- **Status tracking**: Pending, in progress, resolved, closed
- **Category filtering** and status filtering
- **Search functionality** across subject, message, and user name
- **Detailed feedback display** with timestamps and metadata

### 📈 **Statistics Dashboard**
- **Total feedback count**
- **Status breakdown** (pending, in progress, resolved, closed)
- **Average rating** calculation
- **Category distribution** statistics

### 🎨 **User Interface**
- **Tabbed interface** for easy navigation between sending and viewing feedback
- **Responsive design** that works on all devices
- **Clean, minimal UI** following the platform's design system
- **Loading states** and error handling
- **Success notifications** for form submissions

## Component Structure

```tsx
<Feedback />
├── Header Section
│   ├── Title: "Feedback Center"
│   └── Description
├── Statistics Cards
│   ├── Total Feedback
│   ├── Pending
│   ├── Resolved
│   └── Average Rating
└── Tabbed Content
    ├── Send Feedback Tab
    │   ├── Form Fields
    │   ├── Category Selection
    │   ├── Priority Selection
    │   ├── Rating Stars
    │   └── Submit Button
    └── View Feedback Tab
        ├── Search & Filters
        ├── Feedback List
        └── Refresh Button
```

## Data Models

### Feedback Interface
```typescript
interface Feedback {
  id: string;
  userId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'general' | 'improvement' | 'complaint';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  rating?: number;
  userAgent?: string;
  pageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Feedback Stats Interface
```typescript
interface FeedbackStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byCategory: Record<string, number>;
  averageRating: number;
}
```

## Usage

### Basic Implementation
```tsx
import Feedback from './components/Feedback';

function App() {
  return (
    <div>
      <Feedback />
    </div>
  );
}
```

### With Page Wrapper
```tsx
import FeedbackPage from './components/pages/FeedbackPage';

function App() {
  return (
    <Routes>
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
}
```

## Database Setup

### 1. Run the Schema Script
Execute the `feedback_schema.sql` file in your Supabase SQL editor to create the necessary tables and policies.

### 2. Tables Created
- **`feedback`**: Main feedback storage
- **`feedback_responses`**: Admin responses to feedback
- **Indexes**: For performance optimization
- **Triggers**: For automatic timestamp updates

### 3. Row Level Security (RLS)
- Users can view and create their own feedback
- Public can create feedback (for anonymous users)
- Admins can view and manage all feedback
- Secure access controls for feedback responses

## Service Integration

### FeedbackService Methods
- `createFeedback(data)`: Submit new feedback
- `getFeedbackList(limit, offset)`: Fetch feedback with pagination
- `getUserFeedback(userId)`: Get feedback for specific user
- `getFeedbackById(id)`: Get single feedback item
- `updateFeedbackStatus(id, status)`: Update feedback status
- `getFeedbackStats()`: Get aggregated statistics
- `addFeedbackResponse(feedbackId, response)`: Add admin response
- `getFeedbackResponses(feedbackId)`: Get responses for feedback

## Form Validation

### Required Fields
- **Name**: User's name
- **Email**: Valid email address
- **Subject**: Brief description
- **Message**: Detailed feedback content
- **Category**: Feedback type selection

### Optional Fields
- **Priority**: Defaults to 'medium'
- **Rating**: 1-5 star rating
- **User Agent**: Auto-captured
- **Page URL**: Auto-captured

## Search and Filtering

### Search Functionality
- **Global search** across subject, message, and user name
- **Case-insensitive** matching
- **Real-time filtering** as user types

### Filter Options
- **Status filter**: All, pending, in progress, resolved, closed
- **Category filter**: All, bug, feature, improvement, general, complaint
- **Combined filtering** with search terms

## Responsive Design

### Mobile-First Approach
- **Responsive grid layouts** for stats cards
- **Collapsible sections** for mobile navigation
- **Touch-friendly** form controls and buttons
- **Optimized spacing** for different screen sizes

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Interactive Elements

### Form Interactions
- **Real-time validation** feedback
- **Star rating** with visual feedback
- **Category selection** with icons
- **Priority selection** with color coding

### List Interactions
- **Click to expand** feedback details
- **Hover effects** on feedback items
- **Refresh button** for manual updates
- **Filter controls** with immediate results

## Styling

The component uses Tailwind CSS classes and follows the design system:

### Color Scheme
- **Primary**: Blue accents for main actions
- **Success**: Green for resolved/positive states
- **Warning**: Yellow for pending/medium priority
- **Error**: Red for urgent/high priority
- **Neutral**: Gray for closed/low priority

### Typography
- **Headers**: Bold, large text for hierarchy
- **Body**: Clean, readable fonts
- **Labels**: Medium weight for form labels
- **Metadata**: Smaller, muted text for timestamps

## Data Sources

Currently uses mock data, but designed to integrate with:

### Database Integration
- **Supabase** for real-time data storage
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **Optimized queries** with proper indexing

### Future Enhancements
- **Email notifications** for feedback responses
- **Admin dashboard** for feedback management
- **Analytics integration** for feedback insights
- **Export functionality** for feedback reports

## Testing

The component includes comprehensive unit tests covering:

### Test Coverage
- **Component rendering** and basic functionality
- **Form interactions** and validation
- **Search and filtering** behavior
- **Tab switching** and navigation
- **Error handling** and loading states
- **Service integration** and API calls

### Running Tests
```bash
npm run test:run -- src/components/__tests__/Feedback.simple.test.tsx
```

## Accessibility

### ARIA Support
- **Proper labeling** for form controls
- **Screen reader** friendly navigation
- **Keyboard navigation** support
- **Focus management** for tabbed interface

### Visual Accessibility
- **High contrast** color combinations
- **Clear typography** with proper sizing
- **Icon alternatives** with text labels
- **Loading indicators** for async operations

## Performance

### Optimization Features
- **Lazy loading** for feedback list
- **Debounced search** to reduce API calls
- **Efficient state management** with minimal re-renders
- **Optimized database queries** with proper indexing

### Caching Strategy
- **Local state caching** for form data
- **Service layer caching** for frequently accessed data
- **Optimistic updates** for better user experience

## Security

### Data Protection
- **Input sanitization** for user content
- **XSS prevention** with proper escaping
- **CSRF protection** through Supabase
- **Rate limiting** for form submissions

### Privacy
- **User data anonymization** options
- **GDPR compliance** considerations
- **Data retention** policies
- **Secure data transmission** via HTTPS

## Future Enhancements

### Planned Features
- **File attachments** for feedback
- **Feedback templates** for common issues
- **Integration with support tickets**
- **Advanced analytics** and reporting
- **Multi-language support**
- **Feedback voting** and prioritization
- **Automated categorization** using AI
- **Integration with external tools** (Slack, Jira, etc.)

### API Enhancements
- **Webhook support** for real-time notifications
- **Bulk operations** for admin management
- **Advanced filtering** and sorting options
- **Export functionality** for data analysis
