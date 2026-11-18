import { execSync } from 'node:child_process';
import { seo } from '../data/site';

// One-page site: the sitemap lists the home page with the date of the last commit to src/ or public/.
function lastContentDate() {
  try {
    const date = execSync('git log -1 --format=%cs -- src public', { encoding: 'utf8' }).trim();
    if (date) return date;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export function GET() {
  const lastmod = lastContentDate();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${seo.url}</loc><lastmod>${lastmod}</lastmod></url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
