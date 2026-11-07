import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import profile from '../../data/profile.yaml';
import { getArticles } from '../../lib/content';
import { articleHref } from '../../lib/utils';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: `${profile.name} — Insights`,
    description: 'Op-eds and commentary on entrepreneurship and innovation in Nepal.',
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.titleOriginal ? `${a.data.title} (${a.data.titleOriginal})` : a.data.title,
      pubDate: a.data.date,
      description: a.data.summary,
      link: articleHref(a),
    })),
  });
}
