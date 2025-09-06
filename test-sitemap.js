// Simple test to check if sitemap routes work
const express = require('express');
const app = express();

app.get('/sitemap', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://coduxa.vercel.app/</loc></url></urlset>');
});

app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://coduxa.vercel.app/</loc></url></urlset>');
});

app.listen(3000, () => {
  console.log('Test server running on port 3000');
});
