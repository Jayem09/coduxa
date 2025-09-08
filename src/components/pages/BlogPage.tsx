import React from 'react';
import SEO, { seoConfigs } from '../SEO';
import BlogPost from '../blog/BlogPost';

// Blog post data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 'programming-certifications-2024',
    title: 'Programming Certifications That Actually Matter in 2024',
    content: `
      <h2>The Reality of Programming Certifications</h2>
      <p>In today's competitive tech landscape, programming certifications can be the difference between landing your dream job and getting lost in a sea of applications. But not all certifications are created equal.</p>
      
      <h3>Why Certifications Matter More Than Ever</h3>
      <p>The tech industry is experiencing unprecedented growth, with over 1.4 million new developer jobs expected by 2030. However, this growth comes with increased competition.</p>
      
      <h3>The Top Programming Certifications for 2024</h3>
      <ul>
        <li><strong>JavaScript/TypeScript Certifications</strong> - JavaScript remains the most popular programming language</li>
        <li><strong>Cloud Development Certifications</strong> - 94% of enterprises use cloud services</li>
        <li><strong>Mobile Development Certifications</strong> - Mobile app downloads reached 230 billion in 2023</li>
      </ul>
      
      <p>Ready to start your certification journey? <a href="/dashboard/certifications">Explore our certification programs</a> and take the first step toward advancing your career.</p>
    `,
    author: 'Sarah Chen',
    publishDate: '2024-12-19',
    tags: ['Programming Certifications', 'Career Development', 'JavaScript', 'Web Development'],
    readTime: '8 minutes',
    featuredImage: '/images/blog/programming-certifications.jpg'
  },
  {
    id: 'javascript-es6-features',
    title: 'JavaScript ES6+ Features Every Developer Should Master in 2024',
    content: `
      <h2>Introduction</h2>
      <p>JavaScript has evolved dramatically since ES6 (ES2015), introducing powerful features that have fundamentally changed how we write modern JavaScript.</p>
      
      <h3>Essential ES6+ Features</h3>
      <h4>1. Arrow Functions</h4>
      <p>Arrow functions provide a more concise syntax for writing functions and have different \`this\` binding behavior.</p>
      
      <h4>2. Destructuring Assignment</h4>
      <p>Destructuring allows you to extract values from arrays or properties from objects into distinct variables.</p>
      
      <h4>3. Template Literals</h4>
      <p>Template literals provide an easy way to create strings with embedded expressions and multi-line strings.</p>
      
      <p>Master these features and more with our <a href="/dashboard/certifications/javascript">JavaScript certification exam</a>.</p>
    `,
    author: 'Alex Rodriguez',
    publishDate: '2024-12-19',
    tags: ['JavaScript', 'ES6', 'Modern JavaScript', 'Web Development'],
    readTime: '12 minutes',
    featuredImage: '/images/blog/javascript-es6.jpg'
  },
  {
    id: 'react-hooks-best-practices',
    title: 'React Hooks Best Practices: A Complete Guide for Modern Development',
    content: `
      <h2>Introduction</h2>
      <p>React Hooks revolutionized how we write React components, moving from class-based components to functional components with state and lifecycle methods.</p>
      
      <h3>Essential React Hooks</h3>
      <h4>1. useState Hook</h4>
      <p>The \`useState\` hook is the most fundamental hook for managing component state.</p>
      
      <h4>2. useEffect Hook</h4>
      <p>The \`useEffect\` hook handles side effects in functional components.</p>
      
      <h4>3. useContext Hook</h4>
      <p>The \`useContext\` hook provides a way to share data between components without prop drilling.</p>
      
      <p>Test your React knowledge with our <a href="/dashboard/certifications/react">React certification exam</a>.</p>
    `,
    author: 'Maria Santos',
    publishDate: '2024-12-19',
    tags: ['React', 'React Hooks', 'Frontend Development', 'Best Practices'],
    readTime: '15 minutes',
    featuredImage: '/images/blog/react-hooks.jpg'
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...seoConfigs.blog} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coduxa Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tutorials, and best practices for modern software development. 
            Stay ahead with the latest programming trends and certification guides.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <BlogPost {...blogPosts[0]} />
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <BlogPost {...post} />
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6">
            Get the latest programming tips, certification guides, and industry insights delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
            />
            <button className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-r-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
