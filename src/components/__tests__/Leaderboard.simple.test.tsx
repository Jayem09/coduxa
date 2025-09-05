import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Leaderboard from '../Leaderboard'

// Mock Supabase
vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(() => Promise.resolve({
        data: { user: { email: 'test@example.com' } }
      }))
    }
  }
}))

// Mock LeaderboardService
vi.mock('../../services/leaderboardService', () => ({
  LeaderboardService: {
    fetchLeaderboardData: vi.fn(() => Promise.resolve([
      {
        id: '1',
        rank: 1,
        username: 'CodeMaster2024',
        email: 'codemaster@example.com',
        totalScore: 2847,
        examsCompleted: 23,
        certificationsEarned: 8,
        averageScore: 94.2,
        streak: 15,
        lastActive: '2024-01-15T10:30:00Z',
        joinDate: '2023-06-15T09:00:00Z',
        badges: ['JavaScript Expert', 'React Master', 'Full Stack Developer'],
        level: 'expert'
      },
      {
        id: '2',
        rank: 2,
        username: 'DevNinja',
        email: 'devninja@example.com',
        totalScore: 2654,
        examsCompleted: 21,
        certificationsEarned: 7,
        averageScore: 91.8,
        streak: 12,
        lastActive: '2024-01-15T08:45:00Z',
        joinDate: '2023-07-20T14:30:00Z',
        badges: ['Python Pro', 'Data Science', 'Machine Learning'],
        level: 'expert'
      }
    ])),
    fetchLeaderboardStats: vi.fn(() => Promise.resolve({
      totalUsers: 1247,
      totalExams: 15689,
      totalCertifications: 3421,
      averageScore: 78.5,
      topPerformer: 'CodeMaster2024',
      mostActiveUser: 'DevNinja'
    }))
  }
}))

// Mock the UI components
vi.mock('../ui/card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardContent: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardHeader: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardTitle: ({ children, className }: any) => <h3 className={className}>{children}</h3>
}))

vi.mock('../ui/badge', () => ({
  Badge: ({ children, variant, className }: any) => (
    <span className={`badge ${variant} ${className}`}>{children}</span>
  )
}))

vi.mock('../ui/button', () => ({
  Button: ({ children, onClick, variant, size, className }: any) => (
    <button onClick={onClick} className={`button ${variant} ${size} ${className}`}>
      {children}
    </button>
  )
}))

vi.mock('../ui/input', () => ({
  Input: ({ placeholder, value, onChange, className }: any) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      data-testid="search-input"
    />
  )
}))

vi.mock('../ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }: any) => (
    <div data-testid="tabs" data-value={value} onClick={() => onValueChange && onValueChange('exams')}>
      {children}
    </div>
  ),
  TabsList: ({ children, className }: any) => (
    <div className={className} data-testid="tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid={`tab-${value}`}>{children}</button>
  )
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Trophy: () => <div data-testid="trophy-icon">Trophy</div>,
  Medal: () => <div data-testid="medal-icon">Medal</div>,
  Award: () => <div data-testid="award-icon">Award</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
  TrendingUp: () => <div data-testid="trending-icon">Trending</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  Filter: () => <div data-testid="filter-icon">Filter</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  Target: () => <div data-testid="target-icon">Target</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
  Crown: () => <div data-testid="crown-icon">Crown</div>,
  Flame: () => <div data-testid="flame-icon">Flame</div>,
  RefreshCw: () => <div data-testid="refresh-icon">Refresh</div>
}))

describe('Leaderboard Component - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the leaderboard component', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('🏆 Leaderboard')).toBeInTheDocument()
    })
    
    expect(screen.getByText(/Compete with developers worldwide/)).toBeInTheDocument()
  })

  it('displays loading state initially', () => {
    render(<Leaderboard />)
    
    expect(screen.getByText('Loading leaderboard...')).toBeInTheDocument()
  })

  it('displays stats cards after loading', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('Exams Completed')).toBeInTheDocument()
      expect(screen.getByText('Certifications')).toBeInTheDocument()
      expect(screen.getByText('Average Score')).toBeInTheDocument()
    })
  })

  it('displays search input', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      const searchInput = screen.getByTestId('search-input')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('placeholder', 'Search users...')
    })
  })

  it('shows category tabs', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByTestId('tab-overall')).toBeInTheDocument()
      expect(screen.getByTestId('tab-exams')).toBeInTheDocument()
      expect(screen.getByTestId('tab-certifications')).toBeInTheDocument()
      expect(screen.getByTestId('tab-streak')).toBeInTheDocument()
    })
  })

  it('displays leaderboard table with top performers', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Top Performers')).toBeInTheDocument()
      expect(screen.getByText('CodeMaster2024')).toBeInTheDocument()
      expect(screen.getByText('DevNinja')).toBeInTheDocument()
      expect(screen.getByText('WebWizard')).toBeInTheDocument()
    })
  })

  it('shows user position when logged in', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Your Position')).toBeInTheDocument()
      expect(screen.getByText('Keep climbing the ranks!')).toBeInTheDocument()
    })
  })

  it('displays recent achievements section', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Recent Achievements')).toBeInTheDocument()
    })
  })

  it('shows call to action section', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Ready to Climb the Leaderboard?')).toBeInTheDocument()
      expect(screen.getByText('Take an Exam')).toBeInTheDocument()
      expect(screen.getByText('View Certifications')).toBeInTheDocument()
    })
  })

  it('filters users by search term', async () => {
    const user = userEvent.setup()
    render(<Leaderboard />)
    
    await waitFor(() => {
      const searchInput = screen.getByTestId('search-input')
      expect(searchInput).toBeInTheDocument()
    })
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'CodeMaster')
    
    await waitFor(() => {
      expect(screen.getByText('CodeMaster2024')).toBeInTheDocument()
      expect(screen.queryByText('DevNinja')).not.toBeInTheDocument()
    })
  })

  it('displays rank icons correctly', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      // First place should have trophy icon
      expect(screen.getByTestId('trophy-icon')).toBeInTheDocument()
    })
  })

  it('shows level badges', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('expert')).toBeInTheDocument()
      expect(screen.getByText('advanced')).toBeInTheDocument()
      expect(screen.getByText('intermediate')).toBeInTheDocument()
      expect(screen.getByText('beginner')).toBeInTheDocument()
    })
  })

  it('displays streak information', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument() // CodeMaster2024's streak
      expect(screen.getByText('12')).toBeInTheDocument() // DevNinja's streak
    })
  })

  it('shows last active time', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      // Should show relative time like "1h ago", "2d ago", etc.
      expect(screen.getByText(/ago/)).toBeInTheDocument()
    })
  })

  it('displays total scores and averages', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('2,847')).toBeInTheDocument() // CodeMaster2024's total score
      expect(screen.getByText('Avg: 94.2%')).toBeInTheDocument()
    })
  })

  it('shows exam and certification counts', async () => {
    render(<Leaderboard />)
    
    await waitFor(() => {
      expect(screen.getByText('23')).toBeInTheDocument() // CodeMaster2024's exams
      expect(screen.getByText('8')).toBeInTheDocument() // CodeMaster2024's certifications
    })
  })
})
