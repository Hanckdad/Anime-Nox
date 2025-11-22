export interface Anime {
  id: string;
  title: string;
  image: string;
  description: string;
  status: 'ongoing' | 'completed';
  genres: string[];
  episodes: Episode[];
  releaseDate: string;
  rating?: number;
  totalEpisodes?: number;
  currentEpisode?: number;
  popularity?: number;
  trailer?: string;
  studios?: string[];
  duration?: number;
  season?: string;
  year?: number;
  type?: string;
  country?: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  videoUrl: string;
  duration?: number;
  thumbnail?: string;
  isFiller?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  watchHistory: WatchHistory[];
  subscriptions: string[];
  createdAt: string;
  preferences?: UserPreferences;
}

export interface WatchHistory {
  animeId: string;
  episodeId: string;
  episodeNumber: number;
  timestamp: number;
  progress: number;
  lastWatched: Date;
  animeTitle: string;
  animeImage: string;
  duration: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  videoQuality: '360p' | '480p' | '720p' | '1080p';
  autoPlay: boolean;
  skipIntro: boolean;
  language: 'id' | 'en' | 'jp';
}

export interface SearchFilters {
  genre?: string;
  status?: string;
  sortBy?: 'popularity' | 'rating' | 'latest' | 'title';
  year?: number;
  season?: string;
  format?: string;
  query?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    currentPage: number;
    hasNextPage: boolean;
    totalPages?: number;
    totalItems?: number;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
