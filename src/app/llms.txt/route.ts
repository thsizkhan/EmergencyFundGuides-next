// Plain-text llms.txt — served at /llms.txt.
// Helps LLMs index the site's purpose and high-value pages.

import { articles } from '@/data/articles';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('');
  lines.push('## Primary entry points');
  lines.push(`- Home: ${absoluteUrl('/')}`);
  lines.push(`- Free 90-second analysis tool: ${absoluteUrl('/#calculator')}`);
  lines.push(`- All guides: ${absoluteUrl('/resources')}`);
  lines.push('');
  lines.push('## Guides');
  for (const a of articles) {
    lines.push(`- [${a.title}](${absoluteUrl(`/resources/${a.slug}`)}): ${a.description}`);
  }
  lines.push('');
  lines.push('## Reference');
  lines.push(`- About: ${absoluteUrl('/about')}`);
  lines.push(`- Privacy: ${absoluteUrl('/privacy')}`);
  lines.push(`- Terms: ${absoluteUrl('/terms')}`);
  lines.push(`- Advertiser disclosure: ${absoluteUrl('/disclosure')}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
