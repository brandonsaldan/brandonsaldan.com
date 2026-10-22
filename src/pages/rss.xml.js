import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';

export async function GET(context) {
    const [posts, papers] = await Promise.all([getCollection('blog'), getCollection('research')]);
    const entries = [
        ...posts.map((item) => ({ item, link: `/blog/${item.id}/` })),
        ...papers.map((item) => ({ item, link: `/research/${item.id}/` }))
    ].sort((a, b) => sortItemsByDateDesc(a.item, b.item));
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: entries.map(({ item, link }) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link,
            pubDate: new Date(Date.UTC(
                item.data.publishDate.getUTCFullYear(),
                item.data.publishDate.getUTCMonth(),
                item.data.publishDate.getUTCDate()
            ))
        }))
    });
}
