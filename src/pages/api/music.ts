import type { APIRoute } from 'astro';
import type { MusicAlbum, MusicArtist, MusicPeriod, MusicResponse, MusicTrack } from '../../data/music-types';

export const prerender = false;

const USER = 'shibbbe';
const LASTFM_ENDPOINT = 'https://ws.audioscrobbler.com/2.0/';
const periods: MusicPeriod[] = ['7day', '1month', '12month', 'overall'];

type LastFmImage = { size?: string; '#text'?: string };
type LastFmTrack = {
  name?: string;
  artist?: { '#text'?: string } | string;
  album?: { '#text'?: string };
  image?: LastFmImage[];
  date?: { uts?: string };
  '@attr'?: { nowplaying?: string };
};
type LastFmAlbum = {
  name?: string;
  artist?: { name?: string };
  image?: LastFmImage[];
  playcount?: string;
};
type LastFmArtist = { name?: string; playcount?: string };

function asArray<T>(value: T | T[] | undefined): T[] {
  return value ? (Array.isArray(value) ? value : [value]) : [];
}

function coverArt(images: LastFmImage[] | undefined): string | null {
  const image = images?.find((item) => item.size === 'extralarge' && item['#text'])
    ?? images?.find((item) => item.size === 'large' && item['#text'])
    ?? images?.find((item) => item['#text']);
  const value = image?.['#text'];
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      url.protocol = 'https:';
      return url.toString();
    }
  } catch {
  }
  return null;
}

async function lastFm(method: string, params: Record<string, string>, apiKey: string): Promise<any> {
  const url = new URL(LASTFM_ENDPOINT);
  url.search = new URLSearchParams({ method, user: USER, api_key: apiKey, format: 'json', ...params }).toString();
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Last.fm returned ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(`Last.fm error ${data.error}`);
  return data;
}

async function allTimeAlbumPlays(album: MusicAlbum, apiKey: string): Promise<number | null> {
  try {
    const data = await lastFm('album.getinfo', {
      artist: album.artist,
      album: album.title,
      username: USER,
      autocorrect: '1',
    }, apiKey);
    const count = Number(data.album?.userplaycount);
    return Number.isFinite(count) && count >= 0 ? count : null;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const requestedPeriod = url.searchParams.get('period');
  const period: MusicPeriod = periods.includes(requestedPeriod as MusicPeriod)
    ? requestedPeriod as MusicPeriod
    : '1month';
  const apiKey = process.env.LASTFM_API_KEY || import.meta.env.LASTFM_API_KEY;

  if (!apiKey) {
    return Response.json({ error: 'not_configured' }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  try {
    const [recentData, albumData, artistData, userData] = await Promise.all([
      lastFm('user.getrecenttracks', { limit: '8' }, apiKey),
      lastFm('user.gettopalbums', { period, limit: '6' }, apiKey),
      lastFm('user.gettopartists', { period, limit: '8' }, apiKey),
      lastFm('user.getinfo', {}, apiKey),
    ]);

    const recentTracks: MusicTrack[] = asArray<LastFmTrack>(recentData.recenttracks?.track)
      .filter((track) => track.name && track.artist)
      .map((track) => ({
        title: track.name ?? '',
        artist: typeof track.artist === 'string' ? track.artist : track.artist?.['#text'] ?? '',
        album: track.album?.['#text'] ?? '',
        image: coverArt(track.image),
        playedAt: track.date?.uts && Number.isFinite(Number(track.date.uts))
          ? new Date(Number(track.date.uts) * 1000).toISOString()
          : null,
        nowPlaying: track['@attr']?.nowplaying === 'true',
      }));

    const topAlbums: MusicAlbum[] = asArray<LastFmAlbum>(albumData.topalbums?.album)
      .filter((album) => album.name)
      .map((album) => ({
        title: album.name ?? '',
        artist: album.artist?.name ?? '',
        image: coverArt(album.image),
        plays: Number(album.playcount) || 0,
        allTimePlays: null,
      }));

    const albumsWithAllTimePlays = period === 'overall'
      ? topAlbums.map((album) => ({ ...album, allTimePlays: album.plays }))
      : await Promise.all(topAlbums.map(async (album) => ({
        ...album,
        allTimePlays: await allTimeAlbumPlays(album, apiKey),
      })));

    const topArtists: MusicArtist[] = asArray<LastFmArtist>(artistData.topartists?.artist)
      .filter((artist) => artist.name)
      .map((artist) => ({
        name: artist.name ?? '',
        plays: Number(artist.playcount) || 0,
      }));

    const registered = Number(userData.user?.registered?.unixtime);
    const data: MusicResponse = {
      user: USER,
      period,
      totalScrobbles: Number(userData.user?.playcount) || 0,
      registeredAt: Number.isFinite(registered) && registered > 0
        ? new Date(registered * 1000).toISOString()
        : null,
      recentTracks,
      topAlbums: albumsWithAllTimePlays,
      topArtists,
    };

    return Response.json(data, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=90' },
    });
  } catch (error) {
    console.error('Could not load Last.fm listening data:', error);
    return Response.json({ error: 'unavailable' }, {
      status: 502,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
};
