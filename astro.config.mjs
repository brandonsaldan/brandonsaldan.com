import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

const vercelRoutes = () => ({
    name: 'vercel-routes',
    hooks: {
        'astro:build:done': async () => {
            const configPath = new URL('./.vercel/output/config.json', import.meta.url);
            const config = JSON.parse(await readFile(configPath, 'utf8'));
            const routes = config.routes.filter((route) => route.src !== '^/_astro/(.*)$');
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
                    src: '^/_astro/(.*)$',
                    headers: { 'cache-control': 'public, max-age=31536000, immutable' },
                    continue: true
                },
                {
                    src: '^/(.*)$',
                    headers: {
                        'X-Content-Type-Options': 'nosniff',
                        'Referrer-Policy': 'strict-origin-when-cross-origin'
                    },
                    continue: true
                },
                ...routes
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
        sitemap(),
        tailwind({
            applyBaseStyles: false
        }),
        vercelRoutes()
    ]
});
