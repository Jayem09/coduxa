import React from 'react';

const SitemapGenerator: React.FC = () => {
  const generateSitemap = () => {
    const baseUrl = 'https://coduxa.vercel.app';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/login', priority: '0.8', changefreq: 'monthly' },
      { url: '/signup', priority: '0.8', changefreq: 'monthly' },
      { url: '/dashboard', priority: '0.9', changefreq: 'weekly' },
      { url: '/dashboard/certifications', priority: '0.9', changefreq: 'weekly' },
      { url: '/dashboard/credits', priority: '0.7', changefreq: 'monthly' },
      { url: '/dashboard/roadmap', priority: '0.8', changefreq: 'weekly' },
      { url: '/dashboard/leaderboard', priority: '0.8', changefreq: 'daily' },
      { url: '/dashboard/career', priority: '0.7', changefreq: 'weekly' },
      { url: '/dashboard/faqs', priority: '0.6', changefreq: 'monthly' },
      { url: '/dashboard/feedback', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' }
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    pages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return sitemap;
  };

  return (
    <div>
      <h1>Sitemap Generator</h1>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
        {generateSitemap()}
      </pre>
    </div>
  );
};

export default SitemapGenerator;
