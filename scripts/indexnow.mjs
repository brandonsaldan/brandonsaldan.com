import { readdirSync } from 'node:fs';

const site = 'https://brandonsaldan.com';
const keyFile = readdirSync(new URL('../public/', import.meta.url)).find((file) => /^[a-f0-9]{32}\.txt$/.test(file));
if (!keyFile) throw new Error('No IndexNow key file found in public/');
const key = keyFile.replace('.txt', '');

const locations = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => loc);
};

const sitemaps = await locations(`${site}/sitemap-index.xml`);
const urlList = (await Promise.all(sitemaps.map(locations))).flat();

const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList })
});

console.log(`IndexNow responded ${response.status} for ${urlList.length} URLs`);
if (!response.ok) process.exit(1);
