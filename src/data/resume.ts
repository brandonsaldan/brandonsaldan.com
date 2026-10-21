export type ResumeLens = 'engineering' | 'business' | 'leadership' | 'research';

export const lenses: { id: ResumeLens; label: string }[] = [
    { id: 'engineering', label: 'Engineering' },
    { id: 'business', label: 'Business' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'research', label: 'Research' },
];

export type ResumeEntry = {
    title: string;
    organization: string;
    location?: string;
    start?: string;
    end?: string;
    dates: string;
    href?: string;
    points?: string[];
    notes?: ResumeNote[];
    lenses: ResumeLens[];
};

export type ResumeNote = {
    after: string;
    text: string;
    href?: string;
    label?: string;
};

export const experience: ResumeEntry[] = [
    {
        title: 'Apple Support College Program Advisor',
        organization: 'Apple',
        location: 'Chapel Hill, NC',
        start: '2025-05',
        dates: 'May 2025 – Present',
        lenses: ['engineering', 'business'],
        points: [
            'Selected for Apple’s competitive Support College Program, serving in a corporate role as an advisor while pursuing higher education in Management Information Systems.',
            'Resolve technical issues across Apple’s hardware, software, and services ecosystem using internal tools and workflows, with an emphasis on first-contact resolution and KPI-driven performance.',
            'Deliver clear, empathetic communication to a diverse customer base while maintaining Apple’s standards for confidentiality, service quality, technical accuracy, and user experience.',
        ],
    },
    {
        title: 'Frontend Lead',
        organization: 'Invii',
        location: 'Raleigh, NC',
        start: '2021-02',
        end: '2023-10',
        dates: 'Feb 2021 – Oct 2023',
        href: '/projects/invii/',
        lenses: ['engineering', 'leadership'],
        notes: [
            { after: 'at an early-stage startup', text: 'Invii was a restaurant management platform: one dashboard for analytics, inventory, staff scheduling, and finances, plus digital menus, loyalty programs, and customer feedback.' },
        ],
        points: [
            'Owned all frontend development at an early-stage startup, taking products from first prototype through production.',
            'Developed and maintained a suite of internal dashboards and consumer-facing web applications using Vue.js, Nuxt, and TailwindCSS, focused on responsive, accessible interfaces across the product line.',
            'Collaborated closely with a small cross-functional team spanning design and backend to deliver high-quality, visually appealing, and performant web applications within project timelines.',
            'Built and iterated on UI from design handoff to production, prioritizing performance and accessibility (WCAG/ARIA) across devices and browsers.',
        ],
    },
    {
        title: 'Business Analyst Intern',
        organization: 'City of Raleigh Municipal Government',
        location: 'Raleigh, NC',
        start: '2021-06',
        end: '2021-08',
        dates: 'Jun 2021 – Aug 2021',
        lenses: ['business'],
        points: [
            'Conducted market research for Wotter, a venture-backed swimwear brand, analyzing their existing lineup to identify where a new product line could fit.',
            'Established and coordinated a partnership between a local arts school and Wotter, organizing student-created artwork to be printed on the new product line.',
        ],
    },
];

export const education: ResumeEntry[] = [
    {
        title: 'B.S., Management Information Systems',
        organization: 'University of North Carolina at Charlotte',
        location: 'Charlotte, NC',
        start: '2025-01',
        end: '2027-12',
        dates: 'Jan 2025 – Dec 2027',
        lenses: ['engineering', 'business', 'research'],
        points: ['Minor in Political Science', 'Dean’s List (Spring 2026)'],
    },
    {
        title: 'B.S., Business Analytics',
        organization: 'University of North Carolina at Charlotte',
        location: 'Charlotte, NC',
        start: '2025-01',
        end: '2027-12',
        dates: 'Jan 2025 – Dec 2027',
        lenses: ['business', 'research'],
        points: ['Minor in American Studies', 'Dean’s List (Spring 2026)'],
    },
    {
        title: 'A.A., Business Administration',
        organization: 'Wake Technical Community College',
        location: 'Raleigh, NC',
        start: '2023-01',
        end: '2024-12',
        dates: 'Jan 2023 – Dec 2024',
        lenses: ['business'],
        points: ['Academic Honors'],
    },
];

export const projects: ResumeEntry[] = [
    {
        title: 'Nocturne',
        organization: 'Custom firmware and companion app ecosystem for Spotify Car Thing hardware',
        start: '2024-09',
        dates: 'Sep 2024 – Present',
        href: '/projects/nocturne/',
        lenses: ['engineering', 'leadership'],
        notes: [
            { after: 'the discontinued Spotify Car Thing', text: 'Spotify discontinued the Car Thing in 2024 and shut the devices off that December, leaving them unusable without custom firmware.' },
            { after: '1,700+ member community', text: 'The project is open source.', href: 'https://github.com/usenocturne', label: 'github.com/usenocturne' },
            { after: 'embedded Linux distribution (Buildroot)', text: 'The third base OS. Early betas ran Debian 12 with a Raspberry Pi as a USB network bridge; version 3 moved to NixOS with Bluetooth tethering through a phone hotspot.' },
            { after: 'ARM Cortex-A53 SoC', text: 'An Amlogic S905D2 with 512MB of RAM, which is why the wake-word models had to be optimized to run on the device itself.' },
            { after: 'native companion apps on iOS and Android', text: 'Available through Google Play and iOS TestFlight.' },
        ],
        points: [
            'Led development of Nocturne, an open-source custom firmware and companion app ecosystem that repurposes the discontinued Spotify Car Thing into a standalone Bluetooth media controller, overseeing a three-person engineering team across firmware, systems, and mobile development, with 700+ project sponsors and a 1,700+ member community.',
            'Built a complete embedded Linux distribution (Buildroot) and real-time Rust system daemon for the ARM Cortex-A53 SoC, replacing stock firmware with a custom OS featuring Bluetooth audio control, A/B OTA partition failover, and on-device wake-word detection via ONNX inference.',
            'Designed the full-stack architecture spanning embedded firmware, a Rust WebSocket daemon bridging hardware I/O to application logic, and native companion apps on iOS and Android for Bluetooth connectivity and Spotify authentication.',
            'Built a touch-optimized React 19 SPA running on-device in Chromium kiosk mode with full Spotify playback control, hardware button mapping, swipe gestures, dynamic album art gradients, lock screen, and real-time OTA update flows.',
            'Shipped OTA update infrastructure using SWUpdate with cryptographic signature verification and dual-partition failover, enabling safe remote firmware updates across devices in the field.',
        ],
    },
    {
        title: 'Twofold',
        organization: 'In-browser genetic data explorer',
        start: '2023-05',
        dates: 'May 2023 – Present',
        href: '/projects/twofold/',
        lenses: ['engineering', 'research'],
        notes: [
            { after: 'entirely in the browser', text: 'Formerly GeneCodex, first released in 2023 and rebuilt from the ground up in 2026. The project is free and open source.', href: 'https://github.com/brandonsaldan/twofold', label: 'github.com/brandonsaldan/twofold' },
            { after: 'SNPedia’s MediaWiki API', text: 'The October 2026 snapshot requested 220,056 page titles in 4,402 batches, one request at a time, and is cached so later refreshes download only changed pages.' },
            { after: 'a strict Content Security Policy', text: 'The policy only allows connections to the site itself, so nothing on the page can send data to another server.' },
        ],
        points: [
            'Built and maintain a free, open-source genetic data explorer that matches raw DNA files from 23andMe, AncestryDNA, MyHeritage, FamilyTreeDNA, Living DNA, and whole genome VCFs against SNPedia entirely in the browser.',
            'Engineered a data pipeline that crawls SNPedia’s MediaWiki API and compiles 111,734 SNP records, 104,732 genotype annotations, and 283 genosets into fixed reference files that every visitor downloads identically, so no request depends on a person’s genotypes.',
            'Designed a privacy-first architecture with Web Worker processing, a strict Content Security Policy, offline support through a service worker, and optional passphrase-encrypted storage using PBKDF2 and AES-GCM.',
            'Created a report dashboard with filterable findings, topic and genoset views, rare variant flags, and print, CSV, and JSON export, built with Astro, React, and TypeScript and tested with Vitest and Playwright.',
        ],
    },
];

export const volunteering: ResumeEntry[] = [
    {
        title: 'General Partner',
        organization: 'Bagel Fund',
        start: '2024-05',
        dates: 'May 2024 – Present',
        lenses: ['business', 'leadership'],
        notes: [
            { after: 'contributed over $15,000', text: 'Bagel Fund provides $100–500 microgrants for ambitious young builders working on anything from their first Arduino kits to underwater UAVs.', href: 'https://bagel.fund/', label: 'bagel.fund' },
        ],
        points: [
            'Collaboratively contributed over $15,000 to support young innovators by playing an integral role in a team effort to provide financial backing for various projects.',
            'Reviewed applications and collaborated with a team to identify promising young builders and their unique projects in areas such as robotics, AI literacy, and elder care technology.',
            'Offered guidance and resources to young innovators, helping them refine their ideas and develop their projects, including self-driving RC cars and computer vision applications.',
            'Helped promote the organization’s mission to support ambitious young builders by creating awareness through various communication channels.',
        ],
    },
    {
        title: 'Assistant Patrol Leader',
        organization: 'Boy Scouts of America, Del-Mar-Va Council',
        start: '2013-03',
        end: '2016-11',
        dates: 'Mar 2013 – Nov 2016',
        lenses: ['leadership'],
        notes: [
            { after: 'following Hurricane Sandy', text: 'Sandy made landfall in New Jersey in October 2012; rebuilding there went on for years afterward.' },
        ],
        points: [
            'Played an integral role in disaster relief efforts following Hurricane Sandy in New Jersey, providing aid to affected communities and contributing to the rebuilding process.',
            'Assisted in fundraising initiatives, coordinating events and campaigns to generate financial support for scouting programs and community projects.',
            'Mentored and guided younger scouts, fostering personal growth, leadership skills, and character development.',
        ],
    },
];

export const honors: { title: string; issuer: string; date: string; description: string; lenses: ResumeLens[] }[] = [
    {
        title: 'SIFMA Foundation Stock Market Game, First Place',
        issuer: 'SIFMA, University of Delaware',
        date: 'Jan 2017',
        description: 'Led a team and competed against 1,452 students on 454 teams statewide to win first place in the SIFMA Foundation’s Stock Market Game.',
        lenses: ['business', 'leadership'],
    },
    {
        title: 'Delaware Senate Guest of Honor',
        issuer: 'Delaware Senate',
        date: 'Mar 2013',
        description: 'Met with Lt. Governor of Delaware Matt Denn and opened the March 26, 2013 Delaware Senate legislative session in recognition of achievements in advancing K–12 education in the State of Delaware.',
        lenses: ['research', 'leadership'],
    },
];

export const certifications: { title: string; issuer: string; date: string; href: string; lenses: ResumeLens[] }[] = [
    { title: 'Agile Project Management', issuer: 'Google', href: 'https://www.coursera.org/account/accomplishments/verify/HOO7WGDQ4J72', date: 'Nov 2024', lenses: ['business', 'leadership'] },
    { title: 'Project Planning: Putting It All Together', issuer: 'Google', href: 'https://www.coursera.org/account/accomplishments/verify/Q23666ZTH406', date: 'Oct 2024', lenses: ['business', 'leadership'] },
    { title: 'Project Initiation: Starting a Successful Project', issuer: 'Google', href: 'https://www.coursera.org/account/accomplishments/verify/ZBC64UQA76OA', date: 'Sep 2024', lenses: ['business', 'leadership'] },
    { title: 'Foundations of Project Management', issuer: 'Google', href: 'https://www.coursera.org/account/accomplishments/verify/TD5VXFE0L8A2', date: 'Aug 2024', lenses: ['business', 'leadership'] },
];

export const skills: { label: string; items: string[]; lenses: ResumeLens[] }[] = [
    { label: 'Project & Product', items: ['Agile', 'Scrum', 'Sprint Planning', 'Backlog Grooming'], lenses: ['business', 'leadership'] },
    { label: 'Web & App Development', items: ['HTML', 'CSS', 'JS/TS', 'Vue.js', 'Nuxt', 'Next.js', 'React', 'Rust', 'TailwindCSS', 'Figma', 'WCAG/ARIA'], lenses: ['engineering'] },
    { label: 'Data & Reporting', items: ['SQL', 'Excel', 'Data Visualization', 'KPIs'], lenses: ['business', 'research'] },
    { label: 'Research & Writing', items: ['Literature Review', 'Policy Analysis', 'International Relations Theory', 'Historical Research', 'Academic Writing'], lenses: ['research'] },
    { label: 'Business Tools', items: ['Jira', 'Trello', 'Google Workspace', 'Microsoft Office', 'Slack'], lenses: ['business'] },
];
