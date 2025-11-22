import { Anime, Episode, SearchFilters } from '@/types';
import { API_CONFIG } from '@/utils/constants';
import { getImageWithFallback, sanitizeDescription } from '@/utils/helpers';

// Fallback anime data
const FALLBACK_ANIME: Anime[] = [
  {
    id: '1',
    title: 'One Piece',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=600&fit=crop',
    description: 'Monkey D. Luffy dan kru bajak lautnya menjelajahi Grand Line untuk mencari harta karun legendaris One Piece.',
    status: 'ongoing',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    episodes: [],
    releaseDate: '1999-10-20',
    rating: 8.7,
    totalEpisodes: 1100,
    currentEpisode: 1100,
    popularity: 1000000
  },
  {
    id: '2',
    title: 'Attack on Titan',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=600&fit=crop',
    description: 'Umat manusia tinggal di dalam kota yang dikelilingi tembok raksasa untuk melindungi diri dari Titan.',
    status: 'completed',
    genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
    episodes: [],
    releaseDate: '2013-04-07',
    rating: 9.0,
    totalEpisodes: 75,
    currentEpisode: 75,
    popularity: 950000
  },
  {
    id: '3',
    title: 'Demon Slayer',
    image: 'https://images.unsplash.com/photo-1578632749014-ca77efd052eb?w=400&h=600&fit=crop',
    description: 'Tanjiro Kamado berusaha menyelamatkan adiknya yang berubah menjadi iblis dan membalas dendam atas kematian keluarganya.',
    status: 'completed',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    episodes: [],
    releaseDate: '2019-04-06',
    rating: 8.8,
    totalEpisodes: 26,
    currentEpisode: 26,
    popularity: 900000
  }
];

export const animeService = {
  async getTrendingAnime(): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.trending}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch trending anime');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: anime.status === 'Ongoing' ? 'ongoing' : 'completed',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.currentEpisode,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error fetching trending anime:', error);
      return FALLBACK_ANIME;
    }
  },

  async getPopularAnime(): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.popular}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch popular anime');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: anime.status === 'Ongoing' ? 'ongoing' : 'completed',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.currentEpisode,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error fetching popular anime:', error);
      return FALLBACK_ANIME.slice(0, 2);
    }
  },

  async searchAnime(query: string, filters?: SearchFilters): Promise<Anime[]> {
    try {
      let url = `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.anime}/${encodeURIComponent(query)}`;
      
      const params = new URLSearchParams();
      if (filters?.genre) params.append('genres', filters.genre);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.year) params.append('year', filters.year.toString());
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: anime.status === 'Ongoing' ? 'ongoing' : 'completed',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.currentEpisode,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error searching anime:', error);
      return FALLBACK_ANIME.filter(anime => 
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      );
    }
  },

  async getAnimeById(id: string): Promise<Anime | null> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.info}/${id}`
      );
      
      if (!response.ok) throw new Error('Anime not found');
      
      const data = await response.json();
      
      const episodes: Episode[] = data.episodes?.map((ep: any) => ({
        id: ep.id?.toString() || `${id}-ep-${ep.number}`,
        number: ep.number,
        title: ep.title || `Episode ${ep.number}`,
        videoUrl: ep.url || `#episode-${ep.number}`,
        duration: ep.duration || 24,
        thumbnail: getImageWithFallback(ep.image || data.image)
      })) || [];

      return {
        id: data.id.toString(),
        title: data.title?.romaji || data.title?.english || data.title,
        image: getImageWithFallback(data.image),
        description: sanitizeDescription(data.description || 'No description available'),
        status: data.status === 'Ongoing' ? 'ongoing' : 'completed',
        genres: data.genres || [],
        episodes: episodes,
        releaseDate: data.releaseDate || 'Unknown',
        rating: data.rating ? data.rating / 10 : undefined,
        totalEpisodes: data.totalEpisodes,
        currentEpisode: data.currentEpisode,
        popularity: data.popularity,
        type: data.type,
        country: data.countryOfOrigin
      };
    } catch (error) {
      console.error('Error fetching anime by ID:', error);
      return FALLBACK_ANIME.find(anime => anime.id === id) || null;
    }
  },

  async getAnimeByGenre(genre: string): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.advancedSearch}?genres=[${encodeURIComponent(genre)}]`
      );
      
      if (!response.ok) throw new Error('Genre search failed');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: anime.status === 'Ongoing' ? 'ongoing' : 'completed',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.currentEpisode,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error fetching anime by genre:', error);
      return FALLBACK_ANIME.filter(anime => anime.genres.includes(genre));
    }
  },

  async getOngoingAnime(): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.advancedSearch}?status=Ongoing`
      );
      
      if (!response.ok) throw new Error('Failed to fetch ongoing anime');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: 'ongoing',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.currentEpisode,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error fetching ongoing anime:', error);
      return FALLBACK_ANIME.filter(anime => anime.status === 'ongoing');
    }
  },

  async getCompletedAnime(): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.consumet.baseUrl}${API_CONFIG.consumet.endpoints.advancedSearch}?status=Completed`
      );
      
      if (!response.ok) throw new Error('Failed to fetch completed anime');
      
      const data = await response.json();
      
      return data.results.map((anime: any) => ({
        id: anime.id.toString(),
        title: anime.title?.romaji || anime.title?.english || anime.title,
        image: getImageWithFallback(anime.image),
        description: sanitizeDescription(anime.description || 'No description available'),
        status: 'completed',
        genres: anime.genres || [],
        episodes: [],
        releaseDate: anime.releaseDate || 'Unknown',
        rating: anime.rating ? anime.rating / 10 : undefined,
        totalEpisodes: anime.totalEpisodes,
        currentEpisode: anime.totalEpisodes,
        popularity: anime.popularity
      }));
    } catch (error) {
      console.error('Error fetching completed anime:', error);
      return FALLBACK_ANIME.filter(anime => anime.status === 'completed');
    }
  }
};
