import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Feedback from '../Feedback';
import { FeedbackService } from '../../services/feedbackService';

// Mock the UI components
vi.mock('../ui/card', () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div data-testid="card-content" {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div data-testid="card-header" {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h3 data-testid="card-title" {...props}>{children}</h3>,
}));

vi.mock('../ui/button', () => ({
  Button: ({ children, onClick, disabled, type, ...props }: any) => (
    <button 
      data-testid="button" 
      onClick={onClick} 
      disabled={disabled} 
      type={type}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock('../ui/input', () => ({
  Input: ({ onChange, value, placeholder, type, ...props }: any) => (
    <input 
      data-testid="input" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder}
      type={type}
      {...props}
    />
  ),
}));

vi.mock('../ui/textarea', () => ({
  Textarea: ({ onChange, value, placeholder, rows, ...props }: any) => (
    <textarea 
      data-testid="textarea" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  ),
}));

vi.mock('../ui/badge', () => ({
  Badge: ({ children, className, ...props }: any) => (
    <span data-testid="badge" className={className} {...props}>{children}</span>
  ),
}));

vi.mock('../ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange, ...props }: any) => (
    <div data-testid="tabs" data-value={value} {...props}>
      {children}
    </div>
  ),
  TabsContent: ({ children, value, ...props }: any) => (
    <div data-testid="tabs-content" data-value={value} {...props}>{children}</div>
  ),
  TabsList: ({ children, ...props }: any) => (
    <div data-testid="tabs-list" {...props}>{children}</div>
  ),
  TabsTrigger: ({ children, value, ...props }: any) => (
    <button data-testid="tabs-trigger" data-value={value} {...props}>{children}</button>
  ),
}));

vi.mock('../ui/select', () => ({
  Select: ({ children, value, onValueChange, ...props }: any) => (
    <div data-testid="select" data-value={value} {...props}>{children}</div>
  ),
  SelectContent: ({ children, ...props }: any) => (
    <div data-testid="select-content" {...props}>{children}</div>
  ),
  SelectItem: ({ children, value, ...props }: any) => (
    <div data-testid="select-item" data-value={value} {...props}>{children}</div>
  ),
  SelectTrigger: ({ children, ...props }: any) => (
    <div data-testid="select-trigger" {...props}>{children}</div>
  ),
  SelectValue: ({ placeholder, ...props }: any) => (
    <div data-testid="select-value" {...props}>{placeholder}</div>
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

// Mock FeedbackService
vi.mock('../../services/feedbackService', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    FeedbackService: {
      createFeedback: vi.fn(),
      getFeedbackList: vi.fn(),
      getFeedbackStats: vi.fn(),
    },
  };
});

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
  {
    id: '2',
    userId: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Bug report',
    message: 'Found a bug in the exam interface.',
    category: 'bug' as const,
    priority: 'high' as const,
    status: 'in_progress' as const,
    rating: 3,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const mockStats = {
  total: 2,
  pending: 1,
  inProgress: 1,
  resolved: 0,
  closed: 0,
  byCategory: { general: 1, bug: 1 },
  averageRating: 4.0,
};

describe('Feedback Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (FeedbackService.getFeedbackList as any).mockResolvedValue(mockFeedback);
    (FeedbackService.getFeedbackStats as any).mockResolvedValue(mockStats);
    (FeedbackService.createFeedback as any).mockResolvedValue(mockFeedback[0]);
  });

  it('renders feedback component with header and stats', async () => {
    render(<Feedback />);

    expect(screen.getByText('Feedback Center')).toBeInTheDocument();
    expect(screen.getByText(/Share your thoughts, report bugs, or suggest improvements/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total feedback
      expect(screen.getByText('1')).toBeInTheDocument(); // Pending
      expect(screen.getByText('0')).toBeInTheDocument(); // Resolved
      expect(screen.getByText('4.0')).toBeInTheDocument(); // Average rating
    });
  });

  it('renders send feedback form with all required fields', () => {
    render(<Feedback />);

    expect(screen.getByText('Send Your Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Brief description of your feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please provide detailed information/)).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument();
  });

  it('allows user to fill out feedback form', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Brief description of your feedback'), 'Test subject');
    await user.type(screen.getByPlaceholderText(/Please provide detailed information/), 'Test message');

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test subject')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test message')).toBeInTheDocument();
  });

  it('allows user to select rating stars', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    const stars = screen.getAllByTestId('star-icon');
    await user.click(stars[2]); // Click 3rd star

    expect(stars[2]).toHaveClass('text-yellow-400');
  });

  it('submits feedback form successfully', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Brief description of your feedback'), 'Test subject');
    await user.type(screen.getByPlaceholderText(/Please provide detailed information/), 'Test message');

    const submitButton = screen.getByText('Submit Feedback');
    await user.click(submitButton);

    await waitFor(() => {
      expect(FeedbackService.createFeedback).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test subject',
        message: 'Test message',
        category: 'general',
        priority: 'medium',
        rating: undefined,
        userAgent: expect.any(String),
        pageUrl: expect.any(String),
      });
    });
  });

  it('switches to view tab after successful submission', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    // Fill and submit form
    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Brief description of your feedback'), 'Test subject');
    await user.type(screen.getByPlaceholderText(/Please provide detailed information/), 'Test message');

    await user.click(screen.getByText('Submit Feedback'));

    await waitFor(() => {
      expect(screen.getByText('View Feedback')).toBeInTheDocument();
    });
  });

  it('displays feedback list in view tab', async () => {
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('Great platform!')).toBeInTheDocument();
      expect(screen.getByText('Bug report')).toBeInTheDocument();
      expect(screen.getByText('by John Doe')).toBeInTheDocument();
      expect(screen.getByText('by Jane Smith')).toBeInTheDocument();
    });
  });

  it('filters feedback by search term', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('Great platform!')).toBeInTheDocument();
    });

    // Search for "bug"
    const searchInput = screen.getByPlaceholderText('Search feedback...');
    await user.type(searchInput, 'bug');

    await waitFor(() => {
      expect(screen.queryByText('Great platform!')).not.toBeInTheDocument();
      expect(screen.getByText('Bug report')).toBeInTheDocument();
    });
  });

  it('displays feedback with correct status and priority badges', async () => {
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('in progress')).toBeInTheDocument();
      expect(screen.getByText('medium')).toBeInTheDocument();
      expect(screen.getByText('high')).toBeInTheDocument();
    });
  });

  it('shows loading state when fetching feedback', () => {
    (FeedbackService.getFeedbackList as any).mockImplementation(() => new Promise(() => {}));
    
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    expect(screen.getByText('Loading feedback...')).toBeInTheDocument();
  });

  it('shows no feedback message when list is empty', async () => {
    (FeedbackService.getFeedbackList as any).mockResolvedValue([]);
    
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('No feedback found')).toBeInTheDocument();
      expect(screen.getByText('Be the first to share your feedback!')).toBeInTheDocument();
    });
  });

  it('handles form submission errors gracefully', async () => {
    const user = userEvent.setup();
    (FeedbackService.createFeedback as any).mockRejectedValue(new Error('Submission failed'));
    
    // Mock window.alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<Feedback />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Brief description of your feedback'), 'Test subject');
    await user.type(screen.getByPlaceholderText(/Please provide detailed information/), 'Test message');

    await user.click(screen.getByText('Submit Feedback'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Failed to submit feedback. Please try again.');
    });

    alertSpy.mockRestore();
  });

  it('displays category icons correctly', async () => {
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getAllByTestId('help-circle-icon')).toHaveLength(1); // general category
      expect(screen.getAllByTestId('bug-icon')).toHaveLength(1); // bug category
    });
  });

  it('shows refresh button and allows manual refresh', async () => {
    const user = userEvent.setup();
    render(<Feedback />);

    // Switch to view tab
    const viewTab = screen.getByText('View Feedback');
    fireEvent.click(viewTab);

    await waitFor(() => {
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    const refreshButton = screen.getByText('Refresh');
    await user.click(refreshButton);

    expect(FeedbackService.getFeedbackList).toHaveBeenCalledTimes(2);
  });
});
