export const prerender = true;

const BASE_URL = 'https://gcostello.com';

const pages = [
  { path: '/',           priority: '1.0', changefreq: 'monthly' },
  { path: '/experience', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects',   priority: '0.8', changefreq: 'monthly' },
  { path: '/education',  priority: '0.7', changefreq: 'yearly'  },
  { path: '/interests',  priority: '0.6', changefreq: 'monthly' },
  { path: '/contact',    priority: '0.5', changefreq: 'yearly'  },
];

export function GET() {
  const urls = pages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
