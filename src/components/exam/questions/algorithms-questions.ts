// Algorithms & Data Structures Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const algorithmsBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 1),
    'What is the time complexity of binary search?',
    ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    'O(log n)',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-fundamentals', 2),
    'An algorithm is a step-by-step procedure for solving a problem',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 3),
    'What is the time complexity of linear search?',
    ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    'O(n)',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-fundamentals', 4),
    '___ complexity describes how the runtime of an algorithm grows with input size.',
    'Time',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 5),
    'What is a data structure?',
    ['A programming language', 'A way of organizing and storing data', 'A database', 'A web framework'],
    'A way of organizing and storing data',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-fundamentals', 6),
    'Arrays are a fundamental data structure in programming',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 7),
    'What is the time complexity of accessing an element in an array?',
    ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    'O(1)',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 8),
    'What is a linked list?',
    ['A programming language', 'A linear data structure where elements are linked using pointers', 'A database', 'A web server'],
    'A linear data structure where elements are linked using pointers',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-fundamentals', 9),
    'Stacks follow the Last In, First Out (LIFO) principle',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 10),
    'What is a queue?',
    ['A programming language', 'A linear data structure that follows First In, First Out (FIFO)', 'A database', 'A web framework'],
    'A linear data structure that follows First In, First Out (FIFO)',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 11),
    'What is recursion?',
    ['A programming language', 'A technique where a function calls itself', 'A database', 'A web server'],
    'A technique where a function calls itself',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-fundamentals', 12),
    'Bubble sort is an example of a sorting algorithm',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 13),
    'What is the time complexity of bubble sort?',
    ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    'O(n²)',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-fundamentals', 14),
    'A ___ is a data structure that stores key-value pairs.',
    'hash table',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-fundamentals', 15),
    'What is Big O notation?',
    ['A programming language', 'A way to describe the performance of an algorithm', 'A database', 'A web framework'],
    'A way to describe the performance of an algorithm',
    4
  )
];

// INTERMEDIATE QUESTIONS
export const algorithmsIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 1),
    'What is the time complexity of merge sort?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n log n)',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 2),
    'What is a binary tree?',
    ['A programming language', 'A tree data structure where each node has at most two children', 'A database', 'A web server'],
    'A tree data structure where each node has at most two children',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-intermediate', 3),
    'Quick sort is generally faster than bubble sort',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 4),
    'What is depth-first search (DFS)?',
    ['A programming language', 'A graph traversal algorithm', 'A database', 'A web framework'],
    'A graph traversal algorithm',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-intermediate', 5),
    '___ is a graph traversal algorithm that explores nodes level by level.',
    'Breadth-first search',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 6),
    'What is a heap?',
    ['A programming language', 'A complete binary tree with heap property', 'A database', 'A web server'],
    'A complete binary tree with heap property',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 7),
    'What is the time complexity of heap sort?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n log n)',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-intermediate', 8),
    'Hash tables provide average O(1) time complexity for search operations',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 9),
    'What is dynamic programming?',
    ['A programming language', 'A method for solving complex problems by breaking them down into simpler subproblems', 'A database', 'A web framework'],
    'A method for solving complex problems by breaking them down into simpler subproblems',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 10),
    'What is a graph?',
    ['A programming language', 'A collection of vertices connected by edges', 'A database', 'A web server'],
    'A collection of vertices connected by edges',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-intermediate', 11),
    'Insertion sort is more efficient than selection sort',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 12),
    'What is the time complexity of insertion sort?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n²)',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 13),
    'What is a balanced binary tree?',
    ['A programming language', 'A binary tree where the height difference between left and right subtrees is at most 1', 'A database', 'A web server'],
    'A binary tree where the height difference between left and right subtrees is at most 1',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-intermediate', 14),
    'A ___ is a data structure that follows the Last In, First Out principle.',
    'stack',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-intermediate', 15),
    'What is the space complexity of merge sort?',
    ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    'O(n)',
    5
  )
];

// ADVANCED QUESTIONS
export const algorithmsAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 1),
    'What is the time complexity of Dijkstra\'s algorithm?',
    ['O(n)', 'O(n log n)', 'O(n²)', 'O(V log V + E)'],
    'O(V log V + E)',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 2),
    'What is a red-black tree?',
    ['A programming language', 'A self-balancing binary search tree', 'A database', 'A web server'],
    'A self-balancing binary search tree',
    6
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-advanced', 3),
    'AVL trees are self-balancing binary search trees',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 4),
    'What is the time complexity of quicksort in the average case?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n log n)',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-advanced', 5),
    '___ is an algorithm for finding the shortest path in a weighted graph.',
    'Dijkstra\'s algorithm',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 6),
    'What is a trie?',
    ['A programming language', 'A tree-like data structure for storing strings', 'A database', 'A web server'],
    'A tree-like data structure for storing strings',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 7),
    'What is the time complexity of finding an element in a trie?',
    ['O(n)', 'O(log n)', 'O(m)', 'O(1)'],
    'O(m)',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-advanced', 8),
    'B-trees are commonly used in database systems',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 9),
    'What is the time complexity of Kruskal\'s algorithm?',
    ['O(n)', 'O(n log n)', 'O(n²)', 'O(E log E)'],
    'O(E log E)',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 10),
    'What is a segment tree?',
    ['A programming language', 'A data structure for range queries', 'A database', 'A web server'],
    'A data structure for range queries',
    6
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('algorithms-advanced', 11),
    'Suffix arrays are used for string processing algorithms',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 12),
    'What is the time complexity of Floyd-Warshall algorithm?',
    ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
    'O(n³)',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 13),
    'What is a disjoint set (Union-Find)?',
    ['A programming language', 'A data structure for tracking disjoint sets', 'A database', 'A web server'],
    'A data structure for tracking disjoint sets',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('algorithms-advanced', 14),
    '___ is an algorithm for finding the minimum spanning tree of a graph.',
    'Kruskal\'s algorithm',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('algorithms-advanced', 15),
    'What is the time complexity of binary search in a sorted array?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(log n)',
    4
  )
];

// SORTING & SEARCHING QUESTIONS
export const sortingSearchingQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 1),
    'Which sorting algorithm has the best average-case time complexity?',
    ['Bubble sort', 'Insertion sort', 'Quick sort', 'Selection sort'],
    'Quick sort',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 2),
    'What is the time complexity of selection sort?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n²)',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('sorting-searching', 3),
    'Counting sort is a comparison-based sorting algorithm',
    false,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 4),
    'What is the time complexity of radix sort?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(d(n+k))'],
    'O(d(n+k))',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('sorting-searching', 5),
    '___ is a sorting algorithm that works by repeatedly swapping adjacent elements.',
    'Bubble sort',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 6),
    'Which search algorithm requires the array to be sorted?',
    ['Linear search', 'Binary search', 'Both A and B', 'Neither A nor B'],
    'Binary search',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 7),
    'What is the time complexity of linear search?',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n)',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('sorting-searching', 8),
    'Merge sort is a stable sorting algorithm',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 9),
    'What is the space complexity of quick sort?',
    ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    'O(log n)',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('sorting-searching', 10),
    'Which sorting algorithm is in-place?',
    ['Merge sort', 'Quick sort', 'Both A and B', 'Neither A nor B'],
    'Quick sort',
    4
  )
];

// COMBINED EXPORT
export const algorithmsQuestions: Question[] = [
  ...algorithmsBeginnerQuestions,
  ...algorithmsIntermediateQuestions,
  ...algorithmsAdvancedQuestions,
  ...sortingSearchingQuestions
];
