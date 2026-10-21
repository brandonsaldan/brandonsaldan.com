export type PressMention = {
    outlet: string;
    title: string;
    href: string;
    author?: string;
    date: string;
    quote?: string;
    segment?: string;
    featured?: boolean;
    project: string;
    namesMe?: boolean;
};

export const press: PressMention[] = [
    {
        featured: true,
        outlet: 'Ars Technica',
        project: 'nocturne',
        title: 'Spotify’s Car Thing, due for bricking, is getting an open source second life',
        href: 'https://arstechnica.com/gaming/2024/11/firmware-hacks-are-rejuvenating-spotifys-car-thing-before-the-company-bricks-it/',
        author: 'Kevin Purdy',
        date: '2024-11-12',
        quote: 'Nocturne … is a wholly redesigned Spotify interface that restores all its Spotify functionality.',
    },
    {
        featured: true,
        outlet: 'Gizmodo',
        project: 'nocturne',
        title: 'The Dream of Spotify Car Thing Is Being Kept Alive by Devoted Tinkerers',
        href: 'https://gizmodo.com/spotify-car-thing-is-being-kept-alive-by-devoted-tinkerers-2000536816',
        author: 'Florence Ion',
        date: '2024-12-11',
        quote: 'Nocturne … provides a different take on the Car Thing interface.',
    },
    {
        featured: true,
        outlet: 'Linus Tech Tips',
        project: 'nocturne',
        title: 'The WAN Show, November 1, 2024',
        href: 'https://www.youtube.com/live/rIQlOYS5V-I?t=2048',
        author: 'Luke Lafreniere',
        date: '2024-11-01',
        segment: '34:08',
        quote: 'The only firmware that managed to get the Car Thing’s original features working.',
    },
    {
        outlet: 'XDA Developers',
        project: 'nocturne',
        title: 'Spotify’s Car Thing is more proof that old tech doesn’t have to go to waste',
        href: 'https://www.xda-developers.com/spotify-car-thing-proof-old-tech/',
        author: 'Adam Conway',
        date: '2024-11-17',
        quote: 'It’s a complete re-implementation of Spotify on the Car Thing, restoring all features…',
    },
    {
        outlet: 'Android Authority',
        project: 'nocturne',
        title: 'Spotify users refuse to let Car Thing die with new workarounds',
        href: 'https://www.androidauthority.com/spotify-car-thing-dead-community-workarounds-3507315/',
        author: 'Aamir Siddiqui',
        date: '2024-12-10',
        quote: 'Community-run projects like DeskThing, GlanceThing, Nocturne, and more are helping repurpose the device to be more useful than forced e-waste…',
    },
    {
        outlet: 'TechSpot',
        project: 'nocturne',
        namesMe: true,
        title: 'Developers keep Spotify Car Thing alive with custom firmware',
        href: 'https://www.techspot.com/news/105402-developers-keep-spotify-car-thing-alive-custom-firmware.html',
        author: 'Zo Ahmed',
        date: '2024-11-01',
        quote: 'That did not stop Brandon Saldan and another developer going by the name “shadow” from working tirelessly on the Nocturne project.',
    },
    {
        outlet: 'Notebookcheck',
        project: 'nocturne',
        namesMe: true,
        title: 'Abandoned Spotify Car Thing revived by free firmware that restores original functionality and then some',
        href: 'https://www.notebookcheck.net/Abandoned-Spotify-Car-Thing-revived-by-free-firmware-that-restores-original-functionality-and-then-some.1085973.0.html',
        author: 'Julian van der Merwe',
        date: '2025-08-13',
        quote: 'Nocturne V3 hopes to revive the Car Thing for those who don’t want to waste functional hardware.',
    },
    {
        outlet: 'Dammit Jeff',
        project: 'nocturne',
        namesMe: true,
        title: 'Spotify Bricked The Car Thing, So I Hacked Mine',
        href: 'https://www.youtube.com/watch?v=vQVuGeoqyUc&t=1060s',
        date: '2024-10-30',
        segment: '17:40',
        quote: 'It’s still really, really robust, and I love the feature set and the look of this app.',
    },
    {
        outlet: 'Digital Music News',
        project: 'nocturne',
        namesMe: true,
        title: 'An Open Source Mod for Car Thing Is Here Now — If You Like to Tinker',
        href: 'https://www.digitalmusicnews.com/2024/11/17/car-thing-open-source-mod-nocturne/',
        author: 'Ashley King',
        date: '2024-11-17',
        quote: 'Brandon Saldan has released all the tools needed to get Nocturne running on the Car Thing for anyone who is interested in trying.',
    },
    {
        outlet: 'Yanko Design',
        project: 'nocturne',
        namesMe: true,
        title: 'Nocturne’s Free App Turns Your Bricked Spotify Car Thing Into Something Better Than the Original',
        href: 'https://www.yankodesign.com/2026/05/10/nocturnes-free-app-turns-your-bricked-spotify-car-thing-into-something-better-than-the-original/',
        author: 'Sarang Sheth',
        date: '2026-05-10',
        quote: 'Nocturne picked up where Spotify dropped off.',
    },
    {
        outlet: 'QSR Magazine',
        project: 'invii',
        namesMe: true,
        title: 'Tech Startup Invii Announces Ecosystem of Products to Help Restaurants',
        href: 'https://www.qsrmagazine.com/news/tech-startup-invii-announces-ecosystem-products-help-restaurants/',
        date: '2022-05-16',
        quote: 'Invii announced today an ecosystem of products designed to help restaurants manage customer orders, take payments, manage menus and employees, and more.',
    },
];
