export type Image = {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type Link = {
  text: string;
  href: string;
};

export type SocialLink = Link & {
  handle?: string;
};

export type HeaderLink = Link & {
  section?: 'work' | 'personal';
  showOnHome?: boolean;
};

export type Hero = {
  title?: string;
  text?: string;
  image?: Image;
  actions?: Link[];
};

export type SiteConfig = {
  logo?: Image;
  title: string;
  subtitle?: string;
  description: string;
  image?: Image;
  portrait?: Image;
  topics?: string[];
  headerNavLinks?: HeaderLink[];
  footerNavLinks?: Link[];
  socialLinks?: SocialLink[];
  hero?: Hero;
  postsPerPage?: number;
  projectsPerPage?: number;
};

export const orcid = "https://orcid.org/0009-0005-4385-983X";

const siteConfig: SiteConfig = {
  title: "Brandon Saldan",
  subtitle: "MIS/BA @ UNC Charlotte",
  description:
    "Brandon Saldan works across technology, data, and business strategy. Management Information Systems and Business Analytics student at UNC Charlotte.",
  portrait: {
    src: "/photos/portrait.webp",
    alt: "Brandon Saldan",
  },
  topics: [
    "Management information systems",
    "Business analytics",
    "Business strategy",
    "Software engineering",
    "Political science",
  ],
  image: {
    src: "/og/og-main.png",
    alt: "Brandon Saldan, MIS/BA @ UNC Charlotte",
    width: 1440,
    height: 800,
  },
  headerNavLinks: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Projects",
      href: "/projects/",
      section: 'work',
    },
    {
      text: "Research",
      href: "/research/",
      section: 'work',
    },
    {
      text: "Blog",
      href: "/blog/",
      section: 'work',
    },
    {
      text: "Press",
      href: "/press/",
      section: 'work',
      showOnHome: false,
    },
    {
      text: "Grants",
      href: "/grants/",
      section: 'work',
      showOnHome: false,
    },
    {
      text: "Travel",
      href: "/travel/",
      section: 'personal',
      showOnHome: false,
    },
    {
      text: "Listening",
      href: "/listening/",
      section: 'personal',
      showOnHome: false,
    },
  ],
  footerNavLinks: [
    {
      text: "Contact",
      href: "/contact/",
    },
    {
      text: "Résumé",
      href: "/resume/",
    },
  ],
  socialLinks: [
    {
      text: "LinkedIn",
      href: "https://linkedin.com/in/brandonsaldan",
    },
    {
      text: "GitHub",
      href: "https://github.com/brandonsaldan",
    },
    {
      text: "ORCID",
      href: orcid,
      handle: "0009-0005-4385-983X",
    },
    {
      text: "Twitter",
      href: "https://x.com/brandonsaldan",
    },
    {
      text: "Instagram",
      href: "https://instagram.com/brandonsaldan",
    },
  ],
  hero: {
    text: "I work at the intersection of technology, data, and business strategy, helping teams navigate complex operational and organizational problems.\n\nI’m completing dual degrees in Management Information Systems and Business Analytics with minors in Political Science and American Studies at the University of North Carolina at Charlotte, and work in technical support at Apple. My software engineering background helps me evaluate technology, lead technical work, build products that connect engineering with business strategy, and explain technical decisions plainly to people outside engineering.",
    actions: [
      {
        text: "Get in Touch",
        href: "/contact/",
      },
    ],
  },
  postsPerPage: 8,
  projectsPerPage: 8,
};

export default siteConfig;
