import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: object;
}

const defaultSEO = {
  title: 'Coduxa - Online Programming Certification Platform',
  description: 'Master programming skills with Coduxa\'s comprehensive certification platform. Take coding exams, earn certificates, and showcase your expertise to employers.',
  keywords: 'programming certification, coding exams, programming skills, software development, web development, mobile development, coding certificates, programming courses, tech skills',
  image: 'https://coduxa.vercel.app/og-image.jpg',
  url: 'https://coduxa.vercel.app/',
  type: 'website' as const,
};

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes('Coduxa') ? title : `${title} | Coduxa`;
  const fullUrl = url.startsWith('http') ? url : `https://coduxa.vercel.app${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Coduxa" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@coduxa" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Coduxa - Online Programming Certification Platform',
    description: 'Master programming skills with Coduxa\'s comprehensive certification platform. Take coding exams, earn certificates, and showcase your expertise to employers.',
    keywords: 'programming certification, coding exams, programming skills, software development, web development, mobile development, coding certificates, programming courses, tech skills',
    url: '/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Coduxa",
      "description": "Online programming certification platform for developers",
      "url": "https://coduxa.vercel.app/",
      "logo": "https://coduxa.vercel.app/logo.png",
      "sameAs": [
        "https://twitter.com/coduxa",
        "https://linkedin.com/company/coduxa",
        "https://github.com/coduxa"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@coduxa.com"
      },
      "offers": {
        "@type": "Offer",
        "name": "Programming Certification Courses",
        "description": "Comprehensive programming certification exams and courses",
        "category": "Education"
      }
    }
  },
  
  login: {
    title: 'Login - Access Your Coduxa Account',
    description: 'Sign in to your Coduxa account to access your dashboard, take certification exams, and track your programming progress.',
    keywords: 'login, sign in, coduxa account, programming dashboard, certification access',
    url: '/login',
  },
  
  signup: {
    title: 'Sign Up - Start Your Programming Journey',
    description: 'Create your free Coduxa account and begin your programming certification journey. Join thousands of developers advancing their careers.',
    keywords: 'sign up, register, create account, programming certification, developer account',
    url: '/signup',
  },
  
  dashboard: {
    title: 'Dashboard - Your Programming Progress',
    description: 'Track your programming certification progress, manage credits, and access your learning dashboard on Coduxa.',
    keywords: 'dashboard, programming progress, certification tracking, learning dashboard',
    url: '/dashboard',
  },
  
  credits: {
    title: 'Credits - Purchase Certification Credits',
    description: 'Buy credits to take programming certification exams on Coduxa. Affordable pricing for comprehensive coding assessments.',
    keywords: 'credits, purchase credits, certification credits, programming exams, coding assessments',
    url: '/dashboard/credits',
  },
  
  certifications: {
    title: 'Certifications - Programming Skill Certificates',
    description: 'Browse and take programming certification exams. Earn certificates in web development, mobile development, and more.',
    keywords: 'certifications, programming certificates, coding exams, skill assessment, web development certification',
    url: '/dashboard/certifications',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Programming Certification Courses",
      "description": "Comprehensive programming certification exams and courses",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "JavaScript Fundamentals Certification",
          "description": "Master JavaScript programming fundamentals with our comprehensive certification exam",
          "provider": {
            "@type": "Organization",
            "name": "Coduxa",
            "url": "https://coduxa.vercel.app"
          },
          "courseMode": "online",
          "educationalLevel": "intermediate",
          "timeRequired": "PT45M",
          "coursePrerequisites": "Basic programming knowledge",
          "educationalCredentialAwarded": "JavaScript Fundamentals Certificate",
          "offers": {
            "@type": "Offer",
            "price": "5",
            "priceCurrency": "USD",
            "description": "5 credits required to take this exam"
          }
        },
        {
          "@type": "Course",
          "name": "React Development Certification",
          "description": "Advanced React development skills certification for modern web applications",
          "provider": {
            "@type": "Organization",
            "name": "Coduxa",
            "url": "https://coduxa.vercel.app"
          },
          "courseMode": "online",
          "educationalLevel": "advanced",
          "timeRequired": "PT60M",
          "coursePrerequisites": "JavaScript knowledge, React basics",
          "educationalCredentialAwarded": "React Development Certificate",
          "offers": {
            "@type": "Offer",
            "price": "8",
            "priceCurrency": "USD",
            "description": "8 credits required to take this exam"
          }
        },
        {
          "@type": "Course",
          "name": "Node.js Backend Certification",
          "description": "Server-side development with Node.js certification",
          "provider": {
            "@type": "Organization",
            "name": "Coduxa",
            "url": "https://coduxa.vercel.app"
          },
          "courseMode": "online",
          "educationalLevel": "advanced",
          "timeRequired": "PT90M",
          "coursePrerequisites": "JavaScript knowledge, backend development basics",
          "educationalCredentialAwarded": "Node.js Backend Certificate",
          "offers": {
            "@type": "Offer",
            "price": "12",
            "priceCurrency": "USD",
            "description": "12 credits required to take this exam"
          }
        }
      ]
    }
  },
  
  admin: {
    title: 'Admin Dashboard - Manage Coduxa Platform',
    description: 'Administrative dashboard for managing users, monitoring system health, and overseeing the Coduxa certification platform.',
    keywords: 'admin dashboard, platform management, user management, system monitoring',
    url: '/dashboard/admin',
  },
  
  faqs: {
    title: 'FAQs - Frequently Asked Questions',
    description: 'Find answers to common questions about Coduxa platform, exams, credits, account management, and technical support.',
    keywords: 'faq, frequently asked questions, help, support, coduxa help, platform questions',
    url: '/dashboard/faqs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Coduxa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coduxa is an online programming certification platform that helps developers master coding skills through comprehensive exams and earn industry-recognized certificates."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get started with Coduxa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply sign up for a free account, purchase credits, and start taking certification exams in various programming languages and technologies."
          }
        },
        {
          "@type": "Question",
          "name": "What programming languages are covered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coduxa covers JavaScript, Python, React, Node.js, and many other popular programming languages and frameworks used in modern software development."
          }
        }
      ]
    }
  },
  
  roadmap: {
    title: 'Developer Roadmaps - Learn Programming Skills',
    description: 'Follow structured learning paths to master programming skills. Choose from role-based and skill-based roadmaps designed by industry experts.',
    keywords: 'developer roadmap, programming roadmap, learn to code, coding path, software development roadmap, tech career',
    url: '/dashboard/roadmap',
  },
  
  leaderboard: {
    title: 'Leaderboard - Top Developers & Achievements',
    description: 'Compete with developers worldwide and climb the ranks. View top performers, achievements, and your position in the global coding community.',
    keywords: 'leaderboard, top developers, coding competition, achievements, rankings, programming leaderboard, developer stats',
    url: '/dashboard/leaderboard',
  },
  career: {
    title: 'Career Center - Tech Jobs & Career Development',
    description: 'Discover tech job opportunities, explore career paths, and get expert guidance to advance your software development career. Find your dream job in tech.',
    keywords: 'tech jobs, software developer jobs, career development, programming careers, tech career paths, developer jobs, coding careers',
    url: '/dashboard/career',
  },
  
  feedback: {
    title: 'Feedback Center - Share Your Thoughts',
    description: 'Share your feedback, report bugs, suggest features, and help us improve Coduxa. Your input helps us create a better programming certification platform.',
    keywords: 'feedback, bug report, feature request, improvement suggestions, user feedback, platform feedback, coduxa feedback',
    url: '/dashboard/feedback',
  },

  blog: {
    title: 'Coduxa Blog - Programming Tips & Certification Guides',
    description: 'Expert insights, tutorials, and best practices for modern software development. Stay ahead with the latest programming trends and certification guides.',
    keywords: 'programming blog, coding tutorials, software development tips, programming certification guides, tech blog, developer resources',
    url: '/blog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Coduxa Blog",
      "description": "Expert insights, tutorials, and best practices for modern software development",
      "url": "https://coduxa.vercel.app/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Coduxa",
        "url": "https://coduxa.vercel.app"
      },
      "blogPost": [
        {
          "@type": "BlogPosting",
          "headline": "Programming Certifications That Actually Matter in 2024",
          "description": "Discover which programming certifications actually help advance your career in 2024",
          "url": "https://coduxa.vercel.app/blog/programming-certifications-2024"
        },
        {
          "@type": "BlogPosting",
          "headline": "JavaScript ES6+ Features Every Developer Should Master",
          "description": "Comprehensive guide to modern JavaScript features essential for developers",
          "url": "https://coduxa.vercel.app/blog/javascript-es6-features"
        },
        {
          "@type": "BlogPosting",
          "headline": "React Hooks Best Practices: A Complete Guide",
          "description": "Master React Hooks with this comprehensive guide to modern React development",
          "url": "https://coduxa.vercel.app/blog/react-hooks-best-practices"
        }
      ]
    }
  },

  // Individual exam pages
  javascriptExam: {
    title: 'JavaScript Fundamentals Certification Exam',
    description: 'Take the JavaScript Fundamentals certification exam. Test your knowledge of core JavaScript concepts, ES6+ features, and modern development practices.',
    keywords: 'JavaScript certification, JavaScript exam, programming certification, web development certification, JavaScript fundamentals',
    url: '/dashboard/certifications/javascript',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "JavaScript Fundamentals Certification",
      "description": "Comprehensive JavaScript programming certification exam covering core concepts, ES6+ features, and modern development practices",
      "provider": {
        "@type": "Organization",
        "name": "Coduxa",
        "url": "https://coduxa.vercel.app"
      },
      "courseMode": "online",
      "educationalLevel": "intermediate",
      "timeRequired": "PT45M",
      "coursePrerequisites": "Basic programming knowledge",
      "educationalCredentialAwarded": "JavaScript Fundamentals Certificate",
      "syllabusSections": [
        "JavaScript Basics and Syntax",
        "ES6+ Features and Modern JavaScript",
        "DOM Manipulation and Events",
        "Asynchronous Programming",
        "Error Handling and Debugging"
      ],
      "offers": {
        "@type": "Offer",
        "price": "5",
        "priceCurrency": "USD",
        "description": "5 credits required to take this exam"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2543"
      }
    }
  },

  reactExam: {
    title: 'React Development Certification Exam',
    description: 'Advanced React development certification exam. Test your skills in React components, hooks, state management, and modern React patterns.',
    keywords: 'React certification, React exam, React development, frontend certification, React hooks, component development',
    url: '/dashboard/certifications/react',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "React Development Certification",
      "description": "Advanced React development skills certification for modern web applications",
      "provider": {
        "@type": "Organization",
        "name": "Coduxa",
        "url": "https://coduxa.vercel.app"
      },
      "courseMode": "online",
      "educationalLevel": "advanced",
      "timeRequired": "PT60M",
      "coursePrerequisites": "JavaScript knowledge, React basics",
      "educationalCredentialAwarded": "React Development Certificate",
      "syllabusSections": [
        "React Components and JSX",
        "State Management with Hooks",
        "Props and Component Communication",
        "Lifecycle Methods and Effects",
        "Performance Optimization",
        "Testing React Applications"
      ],
      "offers": {
        "@type": "Offer",
        "price": "8",
        "priceCurrency": "USD",
        "description": "8 credits required to take this exam"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1876"
      }
    }
  },

  nodejsExam: {
    title: 'Node.js Backend Certification Exam',
    description: 'Server-side development certification with Node.js. Test your backend development skills, API creation, and server management.',
    keywords: 'Node.js certification, backend certification, server development, API development, Node.js exam',
    url: '/dashboard/certifications/nodejs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Node.js Backend Certification",
      "description": "Server-side development with Node.js certification",
      "provider": {
        "@type": "Organization",
        "name": "Coduxa",
        "url": "https://coduxa.vercel.app"
      },
      "courseMode": "online",
      "educationalLevel": "advanced",
      "timeRequired": "PT90M",
      "coursePrerequisites": "JavaScript knowledge, backend development basics",
      "educationalCredentialAwarded": "Node.js Backend Certificate",
      "syllabusSections": [
        "Node.js Fundamentals",
        "Express.js Framework",
        "RESTful API Development",
        "Database Integration",
        "Authentication and Security",
        "Deployment and Performance"
      ],
      "offers": {
        "@type": "Offer",
        "price": "12",
        "priceCurrency": "USD",
        "description": "12 credits required to take this exam"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "987"
      }
    }
  }
};
