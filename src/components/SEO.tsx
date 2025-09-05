import { useEffect } from 'react';
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
  image: 'https://coduxa.com/og-image.jpg',
  url: 'https://coduxa.com',
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
  const fullUrl = url.startsWith('http') ? url : `https://coduxa.com${url}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [fullTitle, description, keywords]);

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
      "url": "https://coduxa.com",
      "logo": "https://coduxa.com/logo.png",
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
  }
};
