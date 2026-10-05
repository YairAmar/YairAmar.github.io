import { seo, profile, interests, news, publications, experience, education } from '../data/site';

// Plain-text summary for LLM crawlers (llmstxt.org), generated from the same data as the page.
const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

export function GET() {
  const pubs = publications.map((p) => {
    const links = p.links.map((l) => `[${l.label}](${l.href})`).join(', ');
    return `- **${p.title}**. ${p.authors.join(', ')}. ${p.venue}, ${p.year}.${p.note ? ` ${p.note}` : ''}\n  ${p.summary} ${links}`;
  });
  const entries = (list: typeof experience) =>
    list.map((e) => `- ${e.title}${e.org ? `, ${e.org}` : ''}${e.when ? `, ${e.when}` : ''}`);

  const body = `# ${profile.name}

> ${seo.description}

${profile.bio.map(text).join('\n\n')}

## Research interests

${interests.map((i) => `- ${i.label}`).join('\n')}

## Publications

${pubs.join('\n')}

## Experience

${entries(experience).join('\n')}

## Education

${entries(education).join('\n')}

## News

${news.map((n) => `- ${n.date}: ${text(n.html)}`).join('\n')}

## Links

${profile.links.map((l) => `- [${l.label}](${l.href})`).join('\n')}
- [Home page](${seo.url})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
