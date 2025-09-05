// HTML & CSS Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const htmlCssBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 1),
    'What does HTML stand for?',
    ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
    'HyperText Markup Language',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-basics', 2),
    'HTML is a markup language used to structure content on web pages',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 3),
    'What does CSS stand for?',
    ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
    'Cascading Style Sheets',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('html-css-basics', 4),
    'The ___ tag is used to create a hyperlink in HTML.',
    'a',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 5),
    'Which HTML tag is used to create a heading?',
    ['<head>', '<header>', '<h1>', '<title>'],
    '<h1>',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-basics', 6),
    'CSS can be used to change the appearance of HTML elements',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 7),
    'Which HTML tag is used to create a paragraph?',
    ['<para>', '<p>', '<paragraph>', '<text>'],
    '<p>',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 8),
    'What is the correct way to include CSS in an HTML document?',
    ['<style> tag', '<link> tag', 'Both A and B', 'None of the above'],
    'Both A and B',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-basics', 9),
    'HTML elements must always have a closing tag',
    false,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-basics', 10),
    'Which HTML tag is used to create an unordered list?',
    ['<ul>', '<ol>', '<li>', '<list>'],
    '<ul>',
    3
  )
];

// INTERMEDIATE QUESTIONS
export const htmlCssIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 1),
    'What is the CSS box model?',
    ['A way to organize CSS rules', 'A model that describes how elements are rendered with content, padding, border, and margin', 'A method for creating layouts', 'A way to group HTML elements'],
    'A model that describes how elements are rendered with content, padding, border, and margin',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 2),
    'Which CSS property is used to control the space between elements?',
    ['spacing', 'margin', 'padding', 'gap'],
    'margin',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-intermediate', 3),
    'Flexbox is a CSS layout method that allows flexible arrangement of elements',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 4),
    'What is the purpose of CSS media queries?',
    ['To add animations', 'To create responsive designs', 'To change colors', 'To add borders'],
    'To create responsive designs',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('html-css-intermediate', 5),
    'The ___ CSS property is used to control the display type of an element.',
    'display',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 6),
    'Which HTML5 semantic element is used to define navigation links?',
    ['<nav>', '<navigation>', '<menu>', '<links>'],
    '<nav>',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 7),
    'What is the purpose of CSS specificity?',
    ['To make CSS faster', 'To determine which CSS rule applies when multiple rules target the same element', 'To organize CSS files', 'To reduce file size'],
    'To determine which CSS rule applies when multiple rules target the same element',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-intermediate', 8),
    'CSS Grid is a two-dimensional layout system for the web',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 9),
    'Which CSS property is used to create rounded corners?',
    ['border-radius', 'corner-radius', 'round-corners', 'border-style'],
    'border-radius',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-intermediate', 10),
    'What is the purpose of the HTML5 data attribute?',
    ['To store CSS styles', 'To store custom data private to the page or application', 'To create animations', 'To add borders'],
    'To store custom data private to the page or application',
    4
  )
];

// ADVANCED QUESTIONS
export const htmlCssAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 1),
    'What is the purpose of CSS custom properties (CSS variables)?',
    ['To create animations', 'To store values that can be reused throughout a stylesheet', 'To add borders', 'To change colors'],
    'To store values that can be reused throughout a stylesheet',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 2),
    'Which CSS feature allows you to create complex animations?',
    ['transitions', 'keyframes', 'transforms', 'All of the above'],
    'All of the above',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-advanced', 3),
    'CSS Grid and Flexbox can be used together in the same layout',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 4),
    'What is the purpose of CSS containment?',
    ['To create animations', 'To improve performance by limiting the scope of styles and layout calculations', 'To add borders', 'To change colors'],
    'To improve performance by limiting the scope of styles and layout calculations',
    6
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('html-css-advanced', 5),
    'The ___ CSS property is used to create 3D transformations.',
    'transform',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 6),
    'Which HTML5 API is used for client-side storage?',
    ['localStorage', 'sessionStorage', 'Web Storage API', 'All of the above'],
    'All of the above',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 7),
    'What is the purpose of CSS logical properties?',
    ['To create animations', 'To provide writing-direction aware properties', 'To add borders', 'To change colors'],
    'To provide writing-direction aware properties',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-advanced', 8),
    'CSS Subgrid allows grid items to participate in the sizing of their parent grid',
    true,
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 9),
    'Which CSS feature allows you to create complex selectors?',
    ['pseudo-classes', 'pseudo-elements', 'combinators', 'All of the above'],
    'All of the above',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-advanced', 10),
    'What is the purpose of CSS cascade layers?',
    ['To create animations', 'To control the cascade order of CSS rules', 'To add borders', 'To change colors'],
    'To control the cascade order of CSS rules',
    6
  )
];

// RESPONSIVE DESIGN QUESTIONS
export const htmlCssResponsiveQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 1),
    'What is the purpose of the viewport meta tag?',
    ['To add animations', 'To control how the page is displayed on mobile devices', 'To add borders', 'To change colors'],
    'To control how the page is displayed on mobile devices',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 2),
    'Which CSS unit is most suitable for responsive typography?',
    ['px', 'em', 'rem', 'Both B and C'],
    'Both B and C',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-responsive', 3),
    'Mobile-first design approach starts with designing for mobile devices first',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 4),
    'What is the purpose of CSS breakpoints?',
    ['To create animations', 'To define points where the layout changes', 'To add borders', 'To change colors'],
    'To define points where the layout changes',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('html-css-responsive', 5),
    'The ___ CSS property is used to create flexible layouts that adapt to different screen sizes.',
    'flex',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 6),
    'Which CSS feature is best for creating responsive images?',
    ['max-width', 'object-fit', 'srcset', 'All of the above'],
    'All of the above',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 7),
    'What is the purpose of CSS clamp() function?',
    ['To create animations', 'To set a value that is constrained between a minimum and maximum', 'To add borders', 'To change colors'],
    'To set a value that is constrained between a minimum and maximum',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('html-css-responsive', 8),
    'CSS Grid is particularly useful for creating responsive layouts',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 9),
    'Which HTML5 element is used to provide multiple image sources for different screen sizes?',
    ['<picture>', '<img>', '<source>', 'Both A and C'],
    'Both A and C',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('html-css-responsive', 10),
    'What is the purpose of CSS container queries?',
    ['To create animations', 'To apply styles based on the size of a containing element', 'To add borders', 'To change colors'],
    'To apply styles based on the size of a containing element',
    5
  )
];

// COMBINED EXPORT
export const htmlCssQuestions: Question[] = [
  ...htmlCssBeginnerQuestions,
  ...htmlCssIntermediateQuestions,
  ...htmlCssAdvancedQuestions,
  ...htmlCssResponsiveQuestions
];
