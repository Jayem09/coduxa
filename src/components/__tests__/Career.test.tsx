import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Career from '../Career'

// Mock the UI components
vi.mock('../ui/card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardContent: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardHeader: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardTitle: ({ children, className }: any) => <div className={className}>{children}</div>
}))

vi.mock('../ui/badge', () => ({
  Badge: ({ children, className, variant }: any) => (
    <span className={`badge ${variant || ''} ${className || ''}`}>{children}</span>
  )
}))

vi.mock('../ui/button', () => ({
  Button: ({ children, className, variant, size, onClick }: any) => (
    <button 
      className={`button ${variant || ''} ${size || ''} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}))

vi.mock('../ui/input', () => ({
  Input: ({ className, placeholder, value, onChange, ...props }: any) => (
    <input 
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}))

vi.mock('../ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }: any) => (
    <div data-testid="tabs" data-value={value} data-on-value-change={onValueChange}>
      {children}
    </div>
  ),
  TabsList: ({ children, className }: any) => (
    <div className={className} data-testid="tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children, value, className }: any) => (
    <button className={className} data-testid={`tab-${value}`}>{children}</button>
  ),
  TabsContent: ({ children, value }: any) => (
    <div data-testid={`tab-content-${value}`}>{children}</div>
  )
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Briefcase: () => <div data-testid="briefcase-icon">Briefcase</div>,
  MapPin: () => <div data-testid="mappin-icon">MapPin</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  DollarSign: () => <div data-testid="dollarsign-icon">DollarSign</div>,
  Building: () => <div data-testid="building-icon">Building</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  TrendingUp: () => <div data-testid="trendingup-icon">TrendingUp</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
  Filter: () => <div data-testid="filter-icon">Filter</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  ExternalLink: () => <div data-testid="externallink-icon">ExternalLink</div>,
  BookOpen: () => <div data-testid="bookopen-icon">BookOpen</div>,
  Target: () => <div data-testid="target-icon">Target</div>,
  Award: () => <div data-testid="award-icon">Award</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
  Code: () => <div data-testid="code-icon">Code</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone</div>,
  Brain: () => <div data-testid="brain-icon">Brain</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  Server: () => <div data-testid="server-icon">Server</div>,
  ChevronRight: () => <div data-testid="chevronright-icon">ChevronRight</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  User: () => <div data-testid="user-icon">User</div>,
  GraduationCap: () => <div data-testid="graduationcap-icon">GraduationCap</div>,
  Lightbulb: () => <div data-testid="lightbulb-icon">Lightbulb</div>
}))

describe('Career Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the career component', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByText('🚀 Career Center')).toBeInTheDocument()
      expect(screen.getByText(/Discover job opportunities, explore career paths/)).toBeInTheDocument()
    })
  })

  it('displays stats cards', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByText('Active Jobs')).toBeInTheDocument()
      expect(screen.getByText('1,247')).toBeInTheDocument()
      expect(screen.getByText('Career Paths')).toBeInTheDocument()
      expect(screen.getByText('12')).toBeInTheDocument()
      expect(screen.getByText('Avg. Salary')).toBeInTheDocument()
      expect(screen.getByText('$95K')).toBeInTheDocument()
      expect(screen.getByText('Success Rate')).toBeInTheDocument()
      expect(screen.getByText('87%')).toBeInTheDocument()
    })
  })

  it('displays search input', async () => {
    render(<Career />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search jobs, career paths, or guidance...')
      expect(searchInput).toBeInTheDocument()
    })
  })

  it('shows category tabs', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByTestId('tab-jobs')).toBeInTheDocument()
      expect(screen.getByTestId('tab-paths')).toBeInTheDocument()
      expect(screen.getByTestId('tab-guidance')).toBeInTheDocument()
    })
  })

  it('displays job listings by default', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByText('Available Positions (3)')).toBeInTheDocument()
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('TechCorp Inc.')).toBeInTheDocument()
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
      expect(screen.getByText('StartupXYZ')).toBeInTheDocument()
    })
  })

  it('filters jobs by search term', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search jobs, career paths, or guidance...')
      user.type(searchInput, 'frontend')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      expect(screen.queryByText('Full Stack Developer')).not.toBeInTheDocument()
    })
  })

  it('displays career paths when tab is selected', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const pathsTab = screen.getByTestId('tab-paths')
      user.click(pathsTab)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Career Paths (6)')).toBeInTheDocument()
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    })
  })

  it('displays career guidance when tab is selected', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const guidanceTab = screen.getByTestId('tab-guidance')
      user.click(guidanceTab)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Career Guidance (4)')).toBeInTheDocument()
      expect(screen.getByText('How to Write a Standout Developer Resume')).toBeInTheDocument()
      expect(screen.getByText('Ace Your Technical Interview: Common Questions & Answers')).toBeInTheDocument()
    })
  })

  it('shows job details correctly', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('$120,000 - $160,000')).toBeInTheDocument()
      expect(screen.getByText('5+ years')).toBeInTheDocument()
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })
  })

  it('displays career path information', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const pathsTab = screen.getByTestId('tab-paths')
      user.click(pathsTab)
    })
    
    await waitFor(() => {
      expect(screen.getByText('6-12 months')).toBeInTheDocument()
      expect(screen.getByText('$70,000 - $120,000')).toBeInTheDocument()
      expect(screen.getByText('+15% annually')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })
  })

  it('shows call to action section', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getByText('Ready to Advance Your Career?')).toBeInTheDocument()
      expect(screen.getAllByText('Start Learning')).toHaveLength(2)
      expect(screen.getByText('Browse Jobs')).toBeInTheDocument()
    })
  })

  it('filters career paths by difficulty', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const pathsTab = screen.getByTestId('tab-paths')
      user.click(pathsTab)
    })
    
    await waitFor(() => {
      const difficultySelect = screen.getByDisplayValue('All Levels')
      user.selectOptions(difficultySelect, 'intermediate')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
      expect(screen.getByText('Mobile Developer')).toBeInTheDocument()
    })
  })

  it('displays job type badges correctly', async () => {
    render(<Career />)
    
    await waitFor(() => {
      expect(screen.getAllByText('full time')).toHaveLength(2)
      expect(screen.getByText('internship')).toBeInTheDocument()
    })
  })

  it('shows career guidance categories', async () => {
    const user = userEvent.setup()
    render(<Career />)
    
    await waitFor(() => {
      const guidanceTab = screen.getByTestId('tab-guidance')
      user.click(guidanceTab)
    })
    
    await waitFor(() => {
      expect(screen.getByText('resume')).toBeInTheDocument()
      expect(screen.getByText('interview')).toBeInTheDocument()
      expect(screen.getByText('networking')).toBeInTheDocument()
      expect(screen.getByText('skills')).toBeInTheDocument()
    })
  })
})
