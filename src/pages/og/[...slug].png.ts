import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import siteConfig from '../../data/site-config';

type Card = { label: string; title: string; subtitle?: string; italic?: boolean };
type Style = Record<string, string | number>;
type Node = { type: string; props: { style?: Style; children?: Node[] | string; src?: string; width?: number; height?: number } };

const WIDTH = 1200;
const HEIGHT = 630;
const INK = 'rgb(23, 23, 23)';
const MUTED = 'rgba(23, 23, 23, 0.6)';
const PAPER = 'rgb(242, 241, 235)';

const pages: Record<string, string> = {
    projects: 'Portfolio',
    research: 'Research',
    blog: 'Blog',
    press: 'Press',
    grants: 'Grants',
    travel: 'Travel',
    listening: 'Listening',
    resume: 'Résumé',
    contact: 'Contact'
};

const fontFile = (family: string, file: string) => readFile(`node_modules/@fontsource/${family}/files/${family}-latin-${file}.woff`);

const assets = Promise.all([
    fontFile('newsreader', '500-normal'),
    fontFile('newsreader', '400-normal'),
    fontFile('newsreader', '400-italic'),
    fontFile('inter', '400-normal'),
    siteConfig.portrait ? sharp(`public${siteConfig.portrait.src}`).resize(200, 200).png().toBuffer() : undefined
]);

const box = (style: Style, children: Node[] | string): Node => ({ type: 'div', props: { style: { display: 'flex', ...style }, children } });

const titleSize = (card: Card) => {
    if (card.italic) return 112;
    if (card.title.length > 60) return 52;
    return card.title.length > 32 ? 64 : 80;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [blog, projects, research] = await Promise.all([getCollection('blog'), getCollection('projects'), getCollection('research')]);
    const cards: [string, Card][] = [
        ...Object.entries(pages).map(([slug, title]): [string, Card] => [slug, { label: 'brandonsaldan.com', title, italic: true }]),
        ...blog.map((post): [string, Card] => [`blog/${post.id}`, { label: 'Blog Post', title: post.data.title, subtitle: post.data.excerpt }]),
        ...projects.map((project): [string, Card] => {
            const [title, ...rest] = project.data.title.split(': ');
            return [`projects/${project.id}`, { label: 'Project', title, subtitle: rest.join(': ') || project.data.description }];
        }),
        ...research.map((paper): [string, Card] => [`research/${paper.id}`, { label: paper.data.paperType, title: paper.data.shortTitle, subtitle: paper.data.subtitle }])
    ];
    return cards.map(([slug, card]) => ({ params: { slug }, props: { card } }));
};

export const GET: APIRoute = async ({ props }) => {
    const card = props.card as Card;
    const [serifMedium, serif, serifItalic, sans, portrait] = await assets;
    const identity: Node[] = [
        box({ flexDirection: 'column' }, [
            box({ fontFamily: 'Newsreader', fontWeight: 500, fontSize: 52, lineHeight: 1.1 }, siteConfig.title),
            box({ fontFamily: 'Inter', fontSize: 22, marginTop: 6 }, siteConfig.subtitle ?? '')
        ])
    ];
    if (portrait) {
        identity.unshift({
            type: 'img',
            props: { src: `data:image/png;base64,${portrait.toString('base64')}`, width: 100, height: 100, style: { borderRadius: 50, marginRight: 26 } }
        });
    }
    const heading: Node[] = [
        box({ fontFamily: 'Inter', fontSize: 20, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED }, card.label),
        box(
            {
                display: 'block',
                fontFamily: 'Newsreader',
                fontWeight: card.italic ? 400 : 500,
                fontStyle: card.italic ? 'italic' : 'normal',
                fontSize: titleSize(card),
                lineHeight: 1.08,
                marginTop: 22,
                lineClamp: 3
            },
            card.title
        )
    ];
    if (card.subtitle) {
        heading.push(box({ display: 'block', fontFamily: 'Newsreader', fontSize: 32, lineHeight: 1.25, marginTop: 20, color: MUTED, lineClamp: 2 }, card.subtitle));
    }
    const svg = await satori(
        box({ width: WIDTH, height: HEIGHT, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between', padding: 68, backgroundColor: PAPER, color: INK }, [
            box({ flexDirection: 'column' }, heading),
            box({ alignItems: 'center' }, identity)
        ]) as unknown as Parameters<typeof satori>[0],
        {
            width: WIDTH,
            height: HEIGHT,
            fonts: [
                { name: 'Newsreader', data: serifMedium, weight: 500, style: 'normal' },
                { name: 'Newsreader', data: serif, weight: 400, style: 'normal' },
                { name: 'Newsreader', data: serifItalic, weight: 400, style: 'italic' },
                { name: 'Inter', data: sans, weight: 400, style: 'normal' }
            ]
        }
    );
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
