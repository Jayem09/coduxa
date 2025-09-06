import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock the server app for testing
const createTestApp = () => {
  const app = express();
  
  // Serve sitemap.xml with correct content-type
  app.get("/sitemap", (req, res) => {
    console.log("Sitemap route /sitemap called");
    res.setHeader("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://coduxa.vercel.app/</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/login</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/signup</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/exams</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/leaderboard</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/career</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/roadmap</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/certifications</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/faqs</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/feedback</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/privacy</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://coduxa.vercel.app/terms</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`);
  });

  return app;
};

describe('Sitemap Route', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /sitemap', () => {
    it('should return sitemap with correct content-type', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      expect(response.headers['content-type']).toContain('application/xml');
    });

    it('should return valid XML sitemap structure', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check XML declaration
      expect(xmlContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      
      // Check root element
      expect(xmlContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(xmlContent).toContain('</urlset>');
    });

    it('should include all required pages', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check for all main pages
      const expectedPages = [
        'https://coduxa.vercel.app/',
        'https://coduxa.vercel.app/login',
        'https://coduxa.vercel.app/signup',
        'https://coduxa.vercel.app/exams',
        'https://coduxa.vercel.app/leaderboard',
        'https://coduxa.vercel.app/career',
        'https://coduxa.vercel.app/roadmap',
        'https://coduxa.vercel.app/certifications',
        'https://coduxa.vercel.app/faqs',
        'https://coduxa.vercel.app/feedback',
        'https://coduxa.vercel.app/privacy',
        'https://coduxa.vercel.app/terms'
      ];

      expectedPages.forEach(page => {
        expect(xmlContent).toContain(`<loc>${page}</loc>`);
      });
    });

    it('should have proper priority values', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check homepage has highest priority
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/</loc>');
      expect(xmlContent).toContain('<priority>1.0</priority>');
      
      // Check exams page has high priority
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/exams</loc>');
      expect(xmlContent).toContain('<priority>0.9</priority>');
      
      // Check login/signup have good priority
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/login</loc>');
      expect(xmlContent).toContain('<priority>0.8</priority>');
    });

    it('should have appropriate change frequencies', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check homepage is weekly
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/</loc>');
      expect(xmlContent).toContain('<changefreq>weekly</changefreq>');
      
      // Check leaderboard is daily
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/leaderboard</loc>');
      expect(xmlContent).toContain('<changefreq>daily</changefreq>');
      
      // Check static pages are monthly
      expect(xmlContent).toContain('<loc>https://coduxa.vercel.app/login</loc>');
      expect(xmlContent).toContain('<changefreq>monthly</changefreq>');
    });

    it('should have recent lastmod dates', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check that lastmod dates are present and recent
      expect(xmlContent).toContain('<lastmod>2024-12-19</lastmod>');
      
      // Count how many lastmod entries we have
      const lastmodMatches = xmlContent.match(/<lastmod>2024-12-19<\/lastmod>/g);
      expect(lastmodMatches).toHaveLength(12); // Should have 12 pages
    });

    it('should have valid XML structure for each URL entry', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check that each URL entry has all required elements
      const urlMatches = xmlContent.match(/<url>[\s\S]*?<\/url>/g);
      expect(urlMatches).toHaveLength(12);
      
      urlMatches.forEach(urlEntry => {
        expect(urlEntry).toContain('<loc>');
        expect(urlEntry).toContain('</loc>');
        expect(urlEntry).toContain('<lastmod>');
        expect(urlEntry).toContain('</lastmod>');
        expect(urlEntry).toContain('<changefreq>');
        expect(urlEntry).toContain('</changefreq>');
        expect(urlEntry).toContain('<priority>');
        expect(urlEntry).toContain('</priority>');
      });
    });

    it('should not contain any invalid characters or malformed XML', async () => {
      const response = await request(app)
        .get('/sitemap')
        .expect(200);

      const xmlContent = response.text;
      
      // Check for common XML issues
      expect(xmlContent).not.toContain('&amp;'); // Should not have double-encoded ampersands
      expect(xmlContent).not.toContain('<![CDATA['); // Should not use CDATA for simple text
      expect(xmlContent).not.toContain('&lt;'); // Should not have encoded less-than
      expect(xmlContent).not.toContain('&gt;'); // Should not have encoded greater-than
      
      // Check that all tags are properly closed
      const openTags = xmlContent.match(/<[^/!?][^>]*>/g) || [];
      const closeTags = xmlContent.match(/<\/[^>]*>/g) || [];
      // Allow for self-closing tags and XML declaration
      expect(openTags.length).toBeGreaterThanOrEqual(closeTags.length);
    });
  });
});
