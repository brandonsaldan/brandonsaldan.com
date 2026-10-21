import siteConfig from '../data/site-config';
import { education, experience } from '../data/resume';

export type SchemaNode = Record<string, unknown>;

export const absoluteURL = (path: string) => new URL(path, import.meta.env.SITE).href;

export const siteURL = absoluteURL('/');
export const websiteRef = { '@id': `${siteURL}#website` };
export const personRef = { '@id': `${siteURL}#person` };
export const projectRef = (id: string) => ({ '@id': `${absoluteURL(`/projects/${id}/`)}#project` });

const currentMonth = new Date().toISOString().slice(0, 7);
const currentRole = experience.find(({ end }) => !end);
const schools = (finished: boolean) =>
    [...new Set(education.filter(({ end }) => (end !== undefined && end <= currentMonth) === finished).map(({ organization }) => organization))].map((name) => ({
        '@type': 'CollegeOrUniversity',
        name
    }));

export const website: SchemaNode = {
    '@type': 'WebSite',
    ...websiteRef,
    url: siteURL,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: personRef
};

export const person: SchemaNode = {
    '@type': 'Person',
    ...personRef,
    name: siteConfig.title,
    url: siteURL,
    description: siteConfig.description,
    image: siteConfig.portrait && absoluteURL(siteConfig.portrait.src),
    homeLocation: { '@type': 'Place', name: 'Chapel Hill, North Carolina' },
    jobTitle: currentRole?.title,
    worksFor: currentRole && { '@type': 'Organization', name: currentRole.organization },
    affiliation: schools(false),
    alumniOf: schools(true),
    knowsAbout: siteConfig.topics,
    sameAs: [...(siteConfig.socialLinks ?? []).map(({ href }) => href), ...(siteConfig.profiles ?? [])]
};

export const breadcrumbs = (pageURL: string, trail: [name: string, path: string][]): SchemaNode => ({
    '@type': 'BreadcrumbList',
    '@id': `${pageURL}#breadcrumb`,
    itemListElement: [['Home', '/'] as const, ...trail].map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: absoluteURL(path)
    }))
});

export const mergeGraph = (nodes: SchemaNode[]) => {
    const merged = new Map<unknown, SchemaNode>();
    nodes.forEach((node, index) => {
        const key = typeof node['@id'] === 'string' ? node['@id'] : index;
        merged.set(key, { ...merged.get(key), ...node });
    });
    return [...merged.values()];
};

export const serialize = (data: unknown) => JSON.stringify(data).replaceAll('<', '\\u003c');
