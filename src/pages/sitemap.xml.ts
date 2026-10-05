import { seo } from '../data/site';

// One-page site: the sitemap lists the home page with the build date.
export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${seo.url}</loc><lastmod>${lastmod}</lastmod></url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
