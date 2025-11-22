export const APP_CONFIG = {
  name: 'AnimeNox',
  version: '1.0.0',
  description: 'Streaming Anime Terlengkap',
  author: 'Bayu Official',
  website: 'https://animenox.netlify.app'
};

export const API_CONFIG = {
  consumet: {
    baseUrl: 'https://api.consumet.org',
    endpoints: {
      anime: '/meta/anilist',
      advancedSearch: '/meta/anilist/advanced-search',
      popular: '/meta/anilist/popular',
      trending: '/meta/anilist/trending',
      info: '/meta/anilist/info',
      watch: '/meta/anilist/watch'
    }
  },
  anilist: {
    baseUrl: 'https://graphql.anilist.co'
  },
  jikan: {
    baseUrl: 'https://api.jikan.moe/v4'
  }
};

export const SUPABASE_CONFIG = {
  url: 'https://zqlsbizhwaoepyayzjfp.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHNiaXpod2FvZXB5YXl6amZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTIxODcsImV4cCI6MjA3OTI4ODE4N30._tORF-SlnKIuqGK9wngkK5sw7mSIkDOOFaAwl74IsFs'
};

export const ANIME_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports',
  'Supernatural', 'Thriller', 'Isekai', 'Mecha', 'Music',
  'Psychological', 'Historical', 'Military', 'Police', 'Demons',
  'Magic', 'Super Power', 'School', 'Ecchi', 'Harem'
];

export const ANIME_SEASONS = ['Winter', 'Spring', 'Summer', 'Fall'];

export const VIDEO_QUALITIES = ['360p', '480p', '720p', '1080p'] as const;

export const STORAGE_KEYS = {
  user: 'animenox_user',
  watchHistory: 'animenox_watch_history',
  favorites: 'animenox_favorites',
  preferences: 'animenox_preferences',
  theme: 'animenox_theme'
};
