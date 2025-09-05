// React Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// REACT BEGINNER QUESTIONS
export const reactBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 1),
    'What is JSX in React?',
    [
      'A JavaScript extension that allows HTML-like syntax',
      'A CSS preprocessor',
      'A build tool',
      'A testing framework'
    ],
    'A JavaScript extension that allows HTML-like syntax',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 2),
    'React components must always return JSX',
    false,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 3),
    'What is the correct way to create a functional component in React?',
    [
      'function MyComponent() { return <div>Hello</div>; }',
      'class MyComponent extends React.Component { }',
      'const MyComponent = () => { return <div>Hello</div>; }',
      'Both A and C are correct'
    ],
    'Both A and C are correct',
    4
  )
];

// REACT INTERMEDIATE QUESTIONS (4-25)
export const reactIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 4),
    'What is the purpose of useEffect hook?',
    [
      'To manage component state',
      'To perform side effects in functional components',
      'To create custom hooks',
      'To handle form submissions'
    ],
    'To perform side effects in functional components',
    6
  ),
  
  questionTemplates.coding(
    generateQuestionId('react-intermediate', 5),
    'Create a simple counter component with useState',
    'import React, { useState } from \'react\';\n\nfunction Counter() {\n  // Your code here\n}',
    [
      { input: 'Counter component', expectedOutput: 'Functional counter with increment/decrement', description: 'Basic counter implementation' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 6),
    'What is the difference between props and state?',
    [
      'Props are passed down, state is internal to component',
      'State is passed down, props are internal to component',
      'No difference',
      'Props are faster'
    ],
    'Props are passed down, state is internal to component',
    5
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 7),
    'React components must return JSX',
    false,
    4
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 8),
    'Create a component that displays a list of items',
    'function ItemList({ items }) {\n  // Your code here\n}',
    [
      { input: 'ItemList({items: ["apple", "banana"]})', expectedOutput: 'Rendered list of items', description: 'Basic list rendering' }
    ],
    10
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 9),
    'What is the purpose of the key prop in lists?',
    [
      'To help React identify which items have changed',
      'To style the list items',
      'To sort the list',
      'To filter the list'
    ],
    'To help React identify which items have changed',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 10),
    'useState can only be used in functional components',
    true,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 11),
    'Create a form component with controlled inputs',
    'function ContactForm() {\n  // Your code here\n}',
    [
      { input: 'ContactForm with name and email fields', expectedOutput: 'Form with controlled inputs', description: 'Basic form handling' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 12),
    'What is the purpose of useCallback hook?',
    [
      'To memoize functions and prevent unnecessary re-renders',
      'To create new functions',
      'To delete functions',
      'To modify functions'
    ],
    'To memoize functions and prevent unnecessary re-renders',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 13),
    'Complete the useEffect cleanup: useEffect(() => { return () => ___ }, [])',
    'cleanup function',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 14),
    'Create a custom hook for fetching data',
    'function useFetch(url) {\n  // Your code here\n}',
    [
      { input: 'useFetch("https://api.example.com")', expectedOutput: 'Hook that returns data and loading state', description: 'Basic custom hook' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 15),
    'What is the purpose of useMemo hook?',
    [
      'To memoize expensive calculations',
      'To create new objects',
      'To delete objects',
      'To modify objects'
    ],
    'To memoize expensive calculations',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 16),
    'React components can have multiple useEffect hooks',
    true,
    4
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 17),
    'Create a component that uses useContext',
    'const ThemeContext = createContext();\n\nfunction ThemedComponent() {\n  // Your code here\n}',
    [
      { input: 'ThemedComponent with theme context', expectedOutput: 'Component using theme from context', description: 'Basic context usage' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 18),
    'What is the purpose of useRef hook?',
    [
      'To access DOM elements or store mutable values',
      'To create new refs',
      'To delete refs',
      'To modify refs'
    ],
    'To access DOM elements or store mutable values',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 19),
    'What is the output of: React.createElement("div", null, "Hello")',
    'JSX element equivalent to <div>Hello</div>',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 20),
    'Create a component with error boundaries',
    'class ErrorBoundary extends React.Component {\n  // Your code here\n}',
    [
      { input: 'ErrorBoundary wrapping child components', expectedOutput: 'Error boundary that catches errors', description: 'Basic error boundary' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 21),
    'What is the purpose of React.memo?',
    [
      'To prevent unnecessary re-renders of functional components',
      'To create new components',
      'To delete components',
      'To modify components'
    ],
    'To prevent unnecessary re-renders of functional components',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 22),
    'useEffect runs after every render by default',
    true,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 23),
    'Create a component that uses useReducer',
    'function Counter() {\n  // Your code here\n}',
    [
      { input: 'Counter with increment/decrement actions', expectedOutput: 'Component using reducer for state', description: 'Basic reducer usage' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 24),
    'What is the purpose of useLayoutEffect?',
    [
      'To perform side effects synchronously after DOM mutations',
      'To create new effects',
      'To delete effects',
      'To modify effects'
    ],
    'To perform side effects synchronously after DOM mutations',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 25),
    'Complete the useState destructuring: const [count, ___] = useState(0)',
    'setCount',
    4
  )
];

// REACT ADVANCED QUESTIONS (26-50)
export const reactAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 26),
    'What is the purpose of React.Suspense?',
    [
      'To handle loading states and code splitting',
      'To create new components',
      'To delete components',
      'To modify components'
    ],
    'To handle loading states and code splitting',
    8
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 27),
    'Create a higher-order component (HOC)',
    'function withLoading(WrappedComponent) {\n  // Your code here\n}',
    [
      { input: 'withLoading(MyComponent)', expectedOutput: 'HOC that adds loading functionality', description: 'Basic HOC implementation' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 28),
    'What is the purpose of useImperativeHandle?',
    [
      'To customize the instance value exposed to parent components',
      'To create new handles',
      'To delete handles',
      'To modify handles'
    ],
    'To customize the instance value exposed to parent components',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 29),
    'React supports server-side rendering (SSR)',
    true,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 30),
    'Implement a custom hook for managing form state',
    'function useForm(initialValues) {\n  // Your code here\n}',
    [
      { input: 'useForm({name: "", email: ""})', expectedOutput: 'Hook that manages form state and validation', description: 'Basic form hook' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 31),
    'What is the purpose of React.lazy?',
    [
      'To enable code splitting with dynamic imports',
      'To create new components',
      'To delete components',
      'To modify components'
    ],
    'To enable code splitting with dynamic imports',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 32),
    'What is the output of: React.Children.map(children, child => child)',
    'Maps over React children and returns new array',
    6
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 33),
    'Create a component that uses React.forwardRef',
    'const FancyButton = React.forwardRef((props, ref) => {\n  // Your code here\n});',
    [
      { input: 'FancyButton with forwarded ref', expectedOutput: 'Component that forwards ref to DOM element', description: 'Basic forwardRef usage' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 34),
    'What is the purpose of useDebugValue?',
    [
      'To display a label for custom hooks in React DevTools',
      'To create new debug values',
      'To delete debug values',
      'To modify debug values'
    ],
    'To display a label for custom hooks in React DevTools',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 35),
    'React supports concurrent features like time slicing',
    true,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 36),
    'Implement a custom hook for managing local storage',
    'function useLocalStorage(key, initialValue) {\n  // Your code here\n}',
    [
      { input: 'useLocalStorage("theme", "light")', expectedOutput: 'Hook that syncs with localStorage', description: 'Basic localStorage hook' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 37),
    'What is the purpose of React.memo with custom comparison?',
    [
      'To provide custom comparison logic for re-rendering',
      'To create new comparisons',
      'To delete comparisons',
      'To modify comparisons'
    ],
    'To provide custom comparison logic for re-rendering',
    8
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 38),
    'Complete the useCallback: useCallback(() => {}, ___)',
    'dependency array',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 39),
    'Create a component that uses React.Portal',
    'function Modal({ children, isOpen }) {\n  // Your code here\n}',
    [
      { input: 'Modal with portal to document.body', expectedOutput: 'Modal rendered outside component tree', description: 'Basic portal usage' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 40),
    'What is the purpose of useTransition?',
    [
      'To mark state updates as transitions for better UX',
      'To create new transitions',
      'To delete transitions',
      'To modify transitions'
    ],
    'To mark state updates as transitions for better UX',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 41),
    'React supports automatic batching of state updates',
    true,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 42),
    'Implement a custom hook for managing API calls',
    'function useApi(url) {\n  // Your code here\n}',
    [
      { input: 'useApi("https://api.example.com/data")', expectedOutput: 'Hook that manages API state (loading, data, error)', description: 'Basic API hook' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 43),
    'What is the purpose of useDeferredValue?',
    [
      'To defer updates to non-urgent values',
      'To create new deferred values',
      'To delete deferred values',
      'To modify deferred values'
    ],
    'To defer updates to non-urgent values',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 44),
    'What is the output of: React.isValidElement(<div>Hello</div>)',
    'true',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 45),
    'Create a component that uses React.cloneElement',
    'function EnhancedButton({ children, ...props }) {\n  // Your code here\n}',
    [
      { input: 'EnhancedButton with cloned children', expectedOutput: 'Component that enhances child elements', description: 'Basic cloneElement usage' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 46),
    'What is the purpose of useId?',
    [
      'To generate unique IDs for accessibility',
      'To create new IDs',
      'To delete IDs',
      'To modify IDs'
    ],
    'To generate unique IDs for accessibility',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('react-intermediate', 47),
    'React supports streaming server-side rendering',
    true,
    7
  ),

  questionTemplates.coding(
    generateQuestionId('react-intermediate', 48),
    'Implement a custom hook for managing WebSocket connections',
    'function useWebSocket(url) {\n  // Your code here\n}',
    [
      { input: 'useWebSocket("ws://localhost:8080")', expectedOutput: 'Hook that manages WebSocket connection', description: 'Basic WebSocket hook' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('react-intermediate', 49),
    'What is the purpose of useSyncExternalStore?',
    [
      'To subscribe to external data sources',
      'To create new external stores',
      'To delete external stores',
      'To modify external stores'
    ],
    'To subscribe to external data sources',
    8
  ),

  questionTemplates.fillBlank(
    generateQuestionId('react-intermediate', 50),
    'Complete the useMemo: useMemo(() => expensiveCalculation(), ___)',
    'dependency array',
    5
  )
];

// COMBINED REACT QUESTIONS
export const reactQuestions: Question[] = [
  ...reactBeginnerQuestions,
  ...reactIntermediateQuestions
];
