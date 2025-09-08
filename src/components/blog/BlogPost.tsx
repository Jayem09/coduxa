import React from 'react';
import SEO from '../SEO';
import { seoConfigs } from '../SEO';

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  readTime: string;
  featuredImage?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  content,
  author,
  publishDate,
  tags,
  readTime,
  featuredImage
}) => {
  const blogSEO = {
    title: `${title} | Coduxa Blog`,
    description: content.substring(0, 160) + '...',
    keywords: tags.join(', '),
    url: `/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": content.substring(0, 160) + '...',
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Coduxa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://coduxa.vercel.app/logo.png"
        }
      },
      "datePublished": publishDate,
      "dateModified": publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://coduxa.vercel.app/blog/${title.toLowerCase().replace(/\s+/g, '-')}`
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO {...blogSEO} />
      
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
            <span className="mx-2">•</span>
            <span>{readTime} read</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {featuredImage && (
          <div className="mb-8">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
