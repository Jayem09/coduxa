import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Feedback from '../Feedback';
import { FeedbackService } from '../../services/feedbackService';

// Mock the UI components
vi.mock('../ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h3 data-testid="card-title">{children}</h3>,
}));

vi.mock('../ui/button', () => ({
  Button: ({ children, onClick, disabled, type }: any) => (
    <button 
      data-testid="button" 
      onClick={onClick} 
      disabled={disabled} 
      type={type}
    >
      {children}
    </button>
  ),
}));

vi.mock('../ui/input', () => ({
  Input: ({ onChange, value, placeholder, type }: any) => (
    <input 
      data-testid="input" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder}
      type={type}
    />
  ),
}));

vi.mock('../ui/textarea', () => ({
  Textarea: ({ onChange, value, placeholder, rows }: any) => (
    <textarea 
      data-testid="textarea" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder}
      rows={rows}
    />
  ),
}));

vi.mock('../ui/badge', () => ({
  Badge: ({ children, className }: any) => (
    <span data-testid="badge" className={className}>{children}</span>
  ),
}));

vi.mock('../ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }: any) => (
    <div data-testid="tabs" data-value={value}>
      {children}
    </div>
  ),
  TabsContent: ({ children, value }: any) => (
    <div data-testid="tabs-content" data-value={value}>{children}</div>
  ),
  TabsList: ({ children }: any) => (
    <div data-testid="tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid="tabs-trigger" data-value={value}>{children}</button>
  ),
}));

vi.mock('../ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="select" data-value={value}>{children}</div>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: any) => (
    <div data-testid="select-item" data-value={value}>{children}</div>
  ),
  SelectTrigger: ({ children }: any) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: any) => (
    <div data-testid="select-value">{placeholder}</div>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  MessageSquare: () => <div data-testid="message-square-icon">MessageSquare</div>,
  Send: () => <div data-testid="send-icon">Send</div>,
  Star: ({ className, onClick }: any) => (
    <div data-testid="star-icon" className={className} onClick={onClick}>Star</div>
  ),
  Bug: () => <div data-testid="bug-icon">Bug</div>,
  Lightbulb: () => <div data-testid="lightbulb-icon">Lightbulb</div>,
  HelpCircle: () => <div data-testid="help-circle-icon">HelpCircle</div>,
  ThumbsUp: () => <div data-testid="thumbs-up-icon">ThumbsUp</div>,
  AlertTriangle: () => <div data-testid="alert-triangle-icon">AlertTriangle</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  CheckCircle: () => <div data-testid="check-circle-icon">CheckCircle</div>,
  XCircle: () => <div data-testid="x-circle-icon">XCircle</div>,
  RefreshCw: ({ className }: any) => <div data-testid="refresh-icon" className={className}>Refresh</div>,
  Filter: () => <div data-testid="filter-icon">Filter</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  User: () => <div data-testid="user-icon">User</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  FileText: () => <div data-testid="file-text-icon">FileText</div>,
}));

const mockFeedback = [
  {
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Great platform!',
    message: 'I love using Coduxa for my programming practice.',
    category: 'general' as const,
    priority: 'medium' as const,
    status: 'pending' as const,
    rating: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockStats = {
  total: 1,
  pending: 1,
  inProgress: 0,
  resolved: 0,
  closed: 0,
  byCategory: { general: 1 },
  averageRating: 5.0,
};

// Mock FeedbackService
vi.mock('../../services/feedbackService', () => ({
  FeedbackService: {
    createFeedback: vi.fn(),
    getFeedbackList: vi.fn(),
    getFeedbackStats: vi.fn(),
  },
}));

describe('Feedback Component - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (FeedbackService.getFeedbackList as any).mockResolvedValue(mockFeedback);
    (FeedbackService.getFeedbackStats as any).mockResolvedValue(mockStats);
    (FeedbackService.createFeedback as any).mockResolvedValue(mockFeedback[0]);
  });

  it('renders feedback component with header', () => {
    render(<Feedback />);

    expect(screen.getByText('Feedback Center')).toBeInTheDocument();
    expect(screen.getByText(/Share your thoughts, report bugs, or suggest improvements/)).toBeInTheDocument();
  });

  it('renders send feedback form', () => {
    render(<Feedback />);

    expect(screen.getByText('Send Your Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument();
  });

  it('allows user to fill out feedback form', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com');

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('displays stats cards', async () => {
    render(<Feedback />);

    await waitFor(() => {
      expect(screen.getAllByText('1')).toHaveLength(2); // Total feedback and Pending both show 1
      expect(screen.getByText('5.0')).toBeInTheDocument(); // Average rating
    });
  });

  it('switches between send and view tabs', () => {
    render(<Feedback />);

    expect(screen.getByText('Send Feedback')).toBeInTheDocument();
    expect(screen.getByText('View Feedback')).toBeInTheDocument();

    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    expect(screen.getByText('View Feedback')).toBeInTheDocument();
  });

  it('displays feedback list in view tab', async () => {
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('Great platform!')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    (FeedbackService.getFeedbackList as any).mockImplementation(() => new Promise(() => {}));
    
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    expect(screen.getByText('Loading feedback...')).toBeInTheDocument();
  });
});
