import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQs from '../FAQs'

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

vi.mock('../ui/accordion', () => ({
  Accordion: ({ children, type, collapsible, className }: any) => (
    <div className={className} data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children, value, className }: any) => (
    <div className={className} data-testid={`accordion-item-${value}`}>{children}</div>
  ),
  AccordionTrigger: ({ children, className }: any) => (
    <button className={className} data-testid="accordion-trigger">{children}</button>
  ),
  AccordionContent: ({ children, className }: any) => (
    <div className={className} data-testid="accordion-content">{children}</div>
  )
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
  HelpCircle: () => <div data-testid="help-icon">Help</div>,
  BookOpen: () => <div data-testid="book-icon">Book</div>,
  CreditCard: () => <div data-testid="credit-icon">Credit</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>
}))

describe('FAQs Component', () => {
  it('renders the FAQs component', () => {
    render(<FAQs />)
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText(/Find answers to common questions about Coduxa/)).toBeInTheDocument()
  })

  it('displays search input', () => {
    render(<FAQs />)
    
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search FAQs...')
  })

  it('shows category filter buttons', () => {
    render(<FAQs />)
    
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Exams')).toBeInTheDocument()
    expect(screen.getByText('Credits')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Technical')).toBeInTheDocument()
    expect(screen.getByText('Billing')).toBeInTheDocument()
  })

  it('displays FAQ questions', () => {
    render(<FAQs />)
    
    expect(screen.getByText('What is Coduxa?')).toBeInTheDocument()
    expect(screen.getByText('How do I get started with Coduxa?')).toBeInTheDocument()
    expect(screen.getByText('Is Coduxa free to use?')).toBeInTheDocument()
  })

  it('filters FAQs by search term', async () => {
    const user = userEvent.setup()
    render(<FAQs />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'credits')
    
    // Should show FAQs related to credits
    expect(screen.getByText('What are credits and how do I get them?')).toBeInTheDocument()
    expect(screen.getByText('How much do credits cost?')).toBeInTheDocument()
    expect(screen.getByText('Do credits expire?')).toBeInTheDocument()
  })

  it('filters FAQs by category', async () => {
    const user = userEvent.setup()
    render(<FAQs />)
    
    const examsButton = screen.getByText('Exams')
    await user.click(examsButton)
    
    // Should show only exam-related FAQs
    expect(screen.getByText('What types of exams are available?')).toBeInTheDocument()
    expect(screen.getByText('How long do exams take?')).toBeInTheDocument()
    expect(screen.getByText('Can I pause and resume an exam?')).toBeInTheDocument()
  })

  it('shows results count', () => {
    render(<FAQs />)
    
    expect(screen.getByText(/Showing \d+ of \d+ questions/)).toBeInTheDocument()
  })

  it('displays contact support section', () => {
    render(<FAQs />)
    
    expect(screen.getByText('Still have questions?')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
    expect(screen.getByText('View Documentation')).toBeInTheDocument()
  })

  it('shows no results message when search yields no results', async () => {
    const user = userEvent.setup()
    render(<FAQs />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'nonexistent')
    
    expect(screen.getByText('No questions found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search terms or category filter.')).toBeInTheDocument()
    expect(screen.getByText('Clear filters')).toBeInTheDocument()
  })

  it('clears filters when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<FAQs />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'nonexistent')
    
    const clearButton = screen.getByText('Clear filters')
    await user.click(clearButton)
    
    // Should show all FAQs again
    expect(screen.getByText('What is Coduxa?')).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })
})
