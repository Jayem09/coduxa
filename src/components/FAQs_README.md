# FAQs Component

A comprehensive, interactive Frequently Asked Questions component for the Coduxa platform.

## Features

### 🔍 **Smart Search & Filtering**

- **Real-time Search**: Search through questions, answers, and tags
- **Category Filtering**: Filter by General, Exams, Credits, Account, Technical, and Billing
- **Tag-based Search**: Find questions by relevant tags
- **Results Counter**: Shows filtered results count

### 📱 **Responsive Design**

- **Mobile-friendly**: Works seamlessly on all device sizes
- **Clean Layout**: Minimal design following platform preferences
- **Accessible**: Proper ARIA labels and keyboard navigation

### 🎨 **Visual Enhancements**

- **Category Icons**: Visual indicators for each FAQ category
- **Color-coded Badges**: Easy identification of categories and tags
- **Smooth Animations**: Accordion expand/collapse with smooth transitions
- **Hover Effects**: Interactive elements with subtle hover states

### 📊 **Content Management**

- **20 Pre-built FAQs**: Comprehensive coverage of common questions
- **Easy to Extend**: Simple data structure for adding new FAQs
- **Categorized Content**: Organized by topic for better user experience

## Usage

### Basic Usage

```tsx
import FAQs from "./components/FAQs";

function App() {
  return (
    <div>
      <FAQs />
    </div>
  );
}
```

### With Header and Footer

```tsx
import FAQs from "./components/FAQs";
import CoduxaHeader from "./components/CoduxaHeader";
import CoduxaFooter from "./components/CoduxaFooter";

function FAQsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CoduxaHeader />
      <FAQs />
      <CoduxaFooter />
    </div>
  );
}
```

## FAQ Categories

### 📋 **General** (3 FAQs)

- Platform overview and getting started
- Free vs premium features
- Basic usage questions

### 📚 **Exams** (5 FAQs)

- Exam types and duration
- Auto-save and resume functionality
- Scoring and certificates
- What happens when you close an exam

### 💳 **Credits** (3 FAQs)

- Credit system explanation
- Pricing and packages
- Credit expiration policy

### 👤 **Account** (3 FAQs)

- Registration and email verification
- Password reset
- Account settings

### 🔧 **Technical** (3 FAQs)

- Browser compatibility
- Security and data protection
- Software requirements

### 💰 **Billing** (3 FAQs)

- Payment methods
- Refund policy
- Student discounts

## Data Structure

```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category:
    | "general"
    | "exams"
    | "credits"
    | "account"
    | "technical"
    | "billing";
  tags: string[];
}
```

## Customization

### Adding New FAQs

```typescript
const newFAQ: FAQ = {
  id: "21",
  question: "Your new question?",
  answer: "Your detailed answer here.",
  category: "general",
  tags: ["new-feature", "custom"],
};

// Add to faqData array
faqData.push(newFAQ);
```

### Adding New Categories

1. Add category to the `FAQ` interface
2. Add icon to `categoryIcons` object
3. Add color scheme to `categoryColors` object
4. Add to categories array in component

### Styling Customization

The component uses Tailwind CSS classes and can be easily customized:

- Colors: Modify `categoryColors` object
- Spacing: Adjust padding/margin classes
- Typography: Change font sizes and weights
- Layout: Modify grid and flex layouts

## Dependencies

- React 18+
- Tailwind CSS
- Lucide React (icons)
- Custom UI components (Card, Badge, Input, Accordion)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Proper ARIA labels
- ✅ Focus management
- ✅ Color contrast compliance

## Performance

- ✅ Optimized search with debouncing
- ✅ Efficient filtering algorithms
- ✅ Minimal re-renders
- ✅ Lazy loading ready

## Future Enhancements

- [ ] FAQ analytics and tracking
- [ ] User feedback on FAQ helpfulness
- [ ] FAQ search suggestions
- [ ] Export FAQs to PDF
- [ ] Multi-language support
- [ ] FAQ rating system
- [ ] Related FAQs suggestions
