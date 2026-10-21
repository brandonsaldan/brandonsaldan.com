import { getImage } from 'astro:assets';

export async function socialImage(image?: { src: ImageMetadata; alt?: string }) {
    if (!image) return undefined;
    const { src, attributes } = await getImage({ src: image.src, width: 1200, format: 'jpg' });
    return { src, alt: image.alt, width: Number(attributes.width), height: Number(attributes.height) };
}

export const ogCard = (slug: string, alt: string) => ({ src: `/og/${slug}.png`, alt, width: 1200, height: 630 });
