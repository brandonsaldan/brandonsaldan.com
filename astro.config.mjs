import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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
        sitemap()
    ]
});
