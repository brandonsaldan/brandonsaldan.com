import { readdirSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const frontmatterDate = (source, key) => source.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1];

const contentDates = () => {
    const dates = new Map();
    for (const collection of ['blog', 'research']) {
        const directory = new URL(`./src/content/${collection}/`, import.meta.url);
        const entries = readdirSync(directory)
            .filter((file) => /\.mdx?$/.test(file))
            .map((file) => {
                const source = readFileSync(new URL(file, directory), 'utf8');
                const date = frontmatterDate(source, 'updatedDate') ?? frontmatterDate(source, 'publishDate');
                return [`/${collection}/${file.replace(/\.mdx?$/, '')}/`, new Date(date)];
            })
            .filter(([, date]) => !Number.isNaN(date.valueOf()));
        entries.forEach(([path, date]) => dates.set(path, date));
        dates.set(`/${collection}/`, new Date(Math.max(...entries.map(([, date]) => date.valueOf()))));
    }
    dates.set('/', new Date(Math.max(dates.get('/blog/').valueOf(), dates.get('/research/').valueOf())));
    return dates;
};

const lastModified = contentDates();

const vercelRoutes = () => ({
    name: 'vercel-routes',
    hooks: {
        'astro:build:done': async () => {
            const configPath = new URL('./.vercel/output/config.json', import.meta.url);
            const config = JSON.parse(await readFile(configPath, 'utf8'));
            config.routes = [
                {
                    src: '^/(.*)$',
                    has: [{ type: 'host', value: 'brandons-place.vercel.app' }],
                    headers: { Location: 'https://brandonsaldan.com/$1' },
                    status: 308
                },
                {
                    src: '^/projects/codex/?$',
                    headers: { Location: '/projects/twofold/' },
                    status: 308
                },
                {
                    src: '^/(.*)$',
                    headers: {
                        'X-Content-Type-Options': 'nosniff',
                        'Referrer-Policy': 'strict-origin-when-cross-origin'
                    },
                    continue: true
                },
                ...config.routes
            ];
            await writeFile(configPath, JSON.stringify(config, null, 2));
        }
    }
});

// https://astro.build/config
export default defineConfig({
    site: 'https://brandonsaldan.com',
    trailingSlash: 'always',
    adapter: vercel(),
    redirects: {
        '/projects/codex/': '/projects/twofold/'
    },
    integrations: [
        mdx(),
        sitemap({
            serialize(item) {
                const date = lastModified.get(new URL(item.url).pathname);
                return date ? { ...item, lastmod: date.toISOString() } : item;
            }
        }),
        vercelRoutes()
    ]
});
