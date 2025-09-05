import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Roadmap from '../Roadmap'

// Mock the UI components
vi.mock('../ui/card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardContent: ({ children, className }: any) => <div className={className}>{children}</div>
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
    <div data-testid="tabs" data-value={value} onClick={() => onValueChange && onValueChange('role')}>
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
  Search: () => <div data-testid="search-icon">Search</div>,
  Code: () => <div data-testid="code-icon">Code</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  Server: () => <div data-testid="server-icon">Server</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone</div>,
  Brain: () => <div data-testid="brain-icon">Brain</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  BarChart3: () => <div data-testid="chart-icon">Chart</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  BookOpen: () => <div data-testid="book-icon">Book</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
  ArrowRight: () => <div data-testid="arrow-icon">Arrow</div>,
  Circle: () => <div data-testid="circle-icon">Circle</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  Target: () => <div data-testid="target-icon">Target</div>
}))

describe('Roadmap Component', () => {
  it('renders the roadmap component', () => {
    render(<Roadmap />)
    
    expect(screen.getByText('Developer Roadmaps')).toBeInTheDocument()
    expect(screen.getByText(/Choose your path and guide your learning journey/)).toBeInTheDocument()
  })

  it('displays search input', () => {
    render(<Roadmap />)
    
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search roadmaps...')
  })

  it('shows category tabs', () => {
    render(<Roadmap />)
    
    expect(screen.getByTestId('tab-all')).toBeInTheDocument()
    expect(screen.getByTestId('tab-role')).toBeInTheDocument()
    expect(screen.getByTestId('tab-skill')).toBeInTheDocument()
  })

  it('displays difficulty filter buttons', () => {
    render(<Roadmap />)
    
    expect(screen.getByText('All Levels')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('displays roadmap cards', () => {
    render(<Roadmap />)
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument()
  })

  it('filters roadmaps by search term', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'frontend')
    
    // Should show only frontend-related roadmaps
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument()
  })

  it('filters roadmaps by difficulty', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    const beginnerButton = screen.getByText('Beginner')
    await user.click(beginnerButton)
    
    // Should show only beginner roadmaps (none in our test data)
    expect(screen.getByText('No roadmaps found')).toBeInTheDocument()
  })

  it('shows results count', () => {
    render(<Roadmap />)
    
    expect(screen.getByText(/Showing \d+ of \d+ roadmaps/)).toBeInTheDocument()
  })

  it('displays community section', () => {
    render(<Roadmap />)
    
    expect(screen.getByText('Join the Learning Community')).toBeInTheDocument()
    expect(screen.getByText('Join Community')).toBeInTheDocument()
    expect(screen.getByText('View All Guides')).toBeInTheDocument()
  })

  it('shows no results message when search yields no results', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'nonexistent')
    
    expect(screen.getByText('No roadmaps found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search terms or filters.')).toBeInTheDocument()
    expect(screen.getByText('Clear filters')).toBeInTheDocument()
  })

  it('clears filters when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'nonexistent')
    
    const clearButton = screen.getByText('Clear filters')
    await user.click(clearButton)
    
    // Should show all roadmaps again
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  it('opens roadmap detail view when start roadmap is clicked', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    const startButtons = screen.getAllByText('Start Roadmap')
    await user.click(startButtons[0])
    
    // Should show roadmap detail view
    expect(screen.getByText('Back to Roadmaps')).toBeInTheDocument()
    expect(screen.getAllByText('Frontend Developer')).toHaveLength(2) // Header and flowchart
  })

  it('returns to roadmap list when back button is clicked', async () => {
    const user = userEvent.setup()
    render(<Roadmap />)
    
    // First, open a roadmap detail view
    const startButtons = screen.getAllByText('Start Roadmap')
    await user.click(startButtons[0])
    
    // Then click back
    const backButton = screen.getByText('Back to Roadmaps')
    await user.click(backButton)
    
    // Should return to roadmap list
    expect(screen.getByText('Developer Roadmaps')).toBeInTheDocument()
    expect(screen.queryByText('Back to Roadmaps')).not.toBeInTheDocument()
  })
})
