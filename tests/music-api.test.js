import { afterEach, expect, test } from 'bun:test';
import { GET } from '../src/pages/api/music.ts';

const originalFetch = globalThis.fetch;
const originalKey = process.env.LASTFM_API_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.LASTFM_API_KEY;
  else process.env.LASTFM_API_KEY = originalKey;
});

test('normalizes listening data and artwork without exposing provider links', async () => {
  process.env.LASTFM_API_KEY = 'test-key';
  globalThis.fetch = async (input) => {
    const method = new URL(String(input)).searchParams.get('method');
    const data = method === 'user.getrecenttracks'
      ? { recenttracks: { track: { name: 'First track', artist: { '#text': 'An artist' }, album: { '#text': 'An album' }, image: [{ size: 'large', '#text': 'https://example.com/cover.jpg' }], url: 'https://example.com/not-lastfm', '@attr': { nowplaying: 'true' } } } }
      : method === 'user.gettopalbums'
        ? { topalbums: { album: { name: 'An album', artist: { name: 'An artist' }, image: [{ size: 'extralarge', '#text': 'http://example.com/album.jpg' }], playcount: '12', url: 'http://www.last.fm/music/An+artist/An+album' } } }
        : method === 'album.getinfo'
          ? { album: { userplaycount: '237' } }
      : method === 'user.gettopartists'
          ? { topartists: { artist: { name: 'An artist', playcount: '34', url: 'https://www.last.fm/music/An+artist' } } }
          : { user: { playcount: '1234', registered: { unixtime: '1704067200' } } };
    return Response.json(data);
  };

  const response = await GET({ url: new URL('https://brandonsaldan.com/api/music/?period=7day') });
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.period).toBe('7day');
  expect(data.totalScrobbles).toBe(1234);
  expect(data.recentTracks[0]).toMatchObject({
    title: 'First track', artist: 'An artist', nowPlaying: true,
  });
  expect(data.recentTracks[0].url).toBeUndefined();
  expect(data.recentTracks[0].image).toBe('https://example.com/cover.jpg');
  expect(data.topAlbums[0].plays).toBe(12);
  expect(data.topAlbums[0].allTimePlays).toBe(237);
  expect(data.topAlbums[0].image).toBe('https://example.com/album.jpg');
  expect(data.topAlbums[0].url).toBeUndefined();
  expect(data.topArtists[0].plays).toBe(34);
});

test('returns a clear unavailable response before an API key is configured', async () => {
  delete process.env.LASTFM_API_KEY;
  const response = await GET({ url: new URL('https://brandonsaldan.com/api/music/') });
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ error: 'not_configured' });
});
