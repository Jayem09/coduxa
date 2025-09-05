# 📝 How to Add Questions to the Exam System

## 🎯 **Question Structure**

Each question follows this structure:

```typescript
{
  id: 'unique-id',                    // Unique identifier
  type: 'question-type',              // multiple-choice, coding, true-false, fill-blank
  title: 'Question Title',            // Main question text
  description: 'Question description', // Additional context
  points: 10,                         // Points for this question
  difficulty: 'easy|medium|hard',     // Difficulty level
  category: 'JavaScript',             // Subject category
  tags: ['tag1', 'tag2'],            // Searchable tags
  // Type-specific fields below...
}
```

## 📋 **Question Types**

### 1. **Multiple Choice Questions**

```typescript
{
  id: 'q1',
  type: 'multiple-choice',
  title: 'What is the correct way to declare a variable?',
  description: 'Choose the correct syntax.',
  points: 5,
  difficulty: 'easy',
  category: 'JavaScript',
  tags: ['variables', 'syntax'],
  options: [
    'var x = 5;',
    'variable x = 5;',
    'v x = 5;',
    'declare x = 5;'
  ],
  correctAnswer: 'var x = 5;'
}
```

### 2. **True/False Questions**

```typescript
{
  id: 'q2',
  type: 'true-false',
  title: 'JavaScript is case-sensitive',
  description: 'Is JavaScript case-sensitive?',
  points: 3,
  difficulty: 'easy',
  category: 'JavaScript',
  tags: ['syntax', 'basics'],
  correctAnswer: 'true'  // or 'false'
}
```

### 3. **Fill in the Blank Questions**

```typescript
{
  id: 'q3',
  type: 'fill-blank',
  title: 'Complete the function declaration',
  description: 'Fill in the blank: ___ myFunction() { }',
  points: 4,
  difficulty: 'easy',
  category: 'JavaScript',
  tags: ['functions', 'syntax'],
  correctAnswer: 'function'
}
```

### 4. **Coding Questions**

```typescript
{
  id: 'q4',
  type: 'coding',
  title: 'Write a function to reverse a string',
  description: 'Create a function that reverses a string.',
  points: 15,
  difficulty: 'medium',
  category: 'JavaScript',
  tags: ['functions', 'strings', 'algorithms'],
  codeTemplate: 'function reverseString(str) {\n  // Your code here\n}',
  testCases: [
    {
      input: '"hello"',
      expectedOutput: '"olleh"',
      description: 'Basic string reversal'
    },
    {
      input: '"world"',
      expectedOutput: '"dlrow"',
      description: 'Another test case'
    }
  ]
}
```

## 🚀 **How to Add Questions**

### **Step 1: Open the Questions File**

Navigate to: `src/backend/pages/ExamsPage.tsx`

### **Step 2: Find the Questions Array**

Look for: `const jsExamQuestions: Question[] = [`

### **Step 3: Add Your Question**

Add your question object to the array:

```typescript
// Add after the last question
{
  id: 'q19',  // Make sure ID is unique
  type: 'multiple-choice',
  title: 'Your question here?',
  description: 'Additional context if needed',
  points: 5,
  difficulty: 'easy',  // or 'medium', 'hard'
  category: 'JavaScript',
  tags: ['your', 'tags'],
  options: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ],
  correctAnswer: 'Option 1'
}
```

### **Step 4: Update Exam Metadata**

Update the exam info at the top:

```typescript
{
  id: 'js-fundamentals',
  title: 'JavaScript Fundamentals',
  description: 'Your updated description',
  duration: 90,        // Adjust time if needed
  questions: 19,       // Update question count
  difficulty: 'Mixed',
  category: 'JavaScript',
  points: 155,         // Update total points
  // ... rest of the properties
}
```

## 📊 **Question Distribution Examples**

### **Beginner Questions (Easy)**

- Basic syntax and concepts
- Simple multiple choice
- True/false questions
- 2-5 points each

### **Intermediate Questions (Medium)**

- Function implementation
- Array/object manipulation
- Scope and closures
- 6-12 points each

### **Advanced Questions (Hard)**

- Complex algorithms
- Advanced JavaScript concepts
- Performance optimization
- 13-25 points each

## 🎨 **Best Practices**

### **Question Writing**

- ✅ Clear and concise questions
- ✅ Avoid ambiguous wording
- ✅ Use proper grammar and spelling
- ✅ Include relevant context

### **Answer Options**

- ✅ Make all options plausible
- ✅ Avoid "all of the above" or "none of the above"
- ✅ Keep options similar in length
- ✅ Randomize correct answer position

### **Coding Questions**

- ✅ Provide clear problem description
- ✅ Include multiple test cases
- ✅ Give helpful code template
- ✅ Test your solution first

### **Difficulty Levels**

- ✅ **Easy**: Basic concepts, syntax
- ✅ **Medium**: Problem solving, functions
- ✅ **Hard**: Complex algorithms, advanced concepts

## 🔧 **Adding New Question Types**

To add a new question type:

1. **Update the Question interface** in `ExamInterface.tsx`
2. **Add the type to the union** in the interface
3. **Update QuestionBank.tsx** to handle the new type
4. **Add rendering logic** for the new type

## 📝 **Example: Adding a React Question**

```typescript
{
  id: 'react-1',
  type: 'multiple-choice',
  title: 'What is JSX in React?',
  description: 'Choose the best definition of JSX.',
  points: 8,
  difficulty: 'medium',
  category: 'React',
  tags: ['jsx', 'syntax', 'react'],
  options: [
    'A JavaScript extension that allows HTML-like syntax',
    'A CSS preprocessor',
    'A build tool',
    'A testing framework'
  ],
  correctAnswer: 'A JavaScript extension that allows HTML-like syntax'
}
```

## 🎯 **Quick Tips**

- **Use descriptive IDs**: `js-variables-1`, `react-hooks-2`
- **Tag everything**: Makes questions searchable
- **Test your questions**: Make sure they work correctly
- **Balance difficulty**: Mix easy, medium, and hard questions
- **Update metadata**: Always update question count and total points

## 🚀 **Ready to Add Questions?**

1. Open `ExamsPage.tsx`
2. Find the `jsExamQuestions` array
3. Add your question following the examples above
4. Update the exam metadata
5. Test your new question!

Happy question writing! 🎉
