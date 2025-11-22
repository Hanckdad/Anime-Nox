import { useState, useEffect, useCallback } from 'react';
import { Anime, SearchFilters } from '@/types';
import { animeService } from '@/services/animeService';
import { debounce } from '@/utils/helpers';

type AnimeSection = 'trending' | 'popular' | 'ongoing' | 'completed' | 'search';

interface UseAnimeReturn {
  anime: Anime[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  searchAnime: (query: string, filters?: SearchFilters) => void;
  refreshAnime: () => void;
  currentSection: AnimeSection;
}

export const useAnime = (initialSection: AnimeSection = 'trending'): UseAnimeReturn => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<AnimeSection>(initialSection);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const fetchAnime = useCallback(async (section: AnimeSection, pageNum: number = 1, isLoadMore: boolean = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
      }

      let data: Anime[] = [];

      switch (section) {
        case 'trending':
          data = await animeService.getTrendingAnime();
          break;
        case 'popular':
          data = await animeService.getPopularAnime();
          break;
        case 'ongoing':
          data = await animeService.getOngoingAnime();
          break;
        case 'completed':
          data = await animeService.getCompletedAnime();
          break;
        case 'search':
          if (searchQuery) {
            data = await animeService.searchAnime(searchQuery, searchFilters);
          } else {
            data = await animeService.getTrendingAnime();
          }
          break;
        default:
          data = await animeService.getTrendingAnime();
      }

      if (isLoadMore) {
        setAnime(prev => [...prev, ...data]);
      } else {
        setAnime(data);
      }

      // For demo purposes, we'll assume there's more data if we have at least 10 items
      setHasMore(data.length >= 10);

    } catch (err) {
      console.error('Error fetching anime:', err);
      setError('Failed to load anime. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchFilters]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string, filters?: SearchFilters) => {
      setSearchQuery(query);
      setSearchFilters(filters || {});
      setCurrentSection('search');
      setPage(1);
      fetchAnime('search', 1, false);
    }, 500),
    [fetchAnime]
  );

  const searchAnime = useCallback((query: string, filters?: SearchFilters) => {
    if (query.trim() === '') {
      // If search is empty, go back to trending
      setCurrentSection('trending');
      setSearchQuery('');
      fetchAnime('trending', 1, false);
    } else {
      debouncedSearch(query, filters);
    }
  }, [debouncedSearch, fetchAnime]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnime(currentSection, nextPage, true);
    }
  }, [loading, hasMore, page, currentSection, fetchAnime]);

  const refreshAnime = useCallback(() => {
    setPage(1);
    fetchAnime(currentSection, 1, false);
  }, [currentSection, fetchAnime]);

  const changeSection = useCallback((section: AnimeSection) => {
    setCurrentSection(section);
    setPage(1);
    setSearchQuery('');
    setSearchFilters({});
    fetchAnime(section, 1, false);
  }, [fetchAnime]);

  // Initial load and section changes
  useEffect(() => {
    changeSection(initialSection);
  }, [initialSection, changeSection]);

  return {
    anime,
    loading,
    error,
    hasMore,
    loadMore,
    searchAnime,
    refreshAnime,
    currentSection
  };
};
