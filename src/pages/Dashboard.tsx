import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAnime } from '@/hooks/useAnime';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Anime } from '@/types';
import { AnimeGrid } from '@/components/anime/AnimeGrid';
import { SearchFilters } from '@/components/anime/SearchFilters';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SnowEffect } from '@/components/ui/SnowEffect';
import { animeService } from '@/services/animeService';
import { ANIME_GENRES } from '@/utils/constants';
import './Dashboard.css';

type DashboardSection = 'trending' | 'popular' | 'ongoing' | 'completed' | 'search';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<DashboardSection>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [recentAnime, setRecentAnime] = useLocalStorage<Anime[]>('recent_anime', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite_anime', []);
  
  const {
    anime,
    loading,
    error,
    hasMore,
    loadMore,
    searchAnime,
    refreshAnime,
    currentSection
  } = useAnime(activeSection);

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.trim()) {
      searchAnime(searchQuery);
    } else if (activeSection === 'search') {
      setActiveSection('trending');
    }
  }, [searchQuery, activeSection, searchAnime]);

  const handleAnimeClick = async (anime: Anime) => {
    // Add to recent anime (max 10)
    setRecentAnime(prev => {
      const filtered = prev.filter(a => a.id !== anime.id);
      return [anime, ...filtered.slice(0, 9)];
    });

    // Navigate to anime detail (will be implemented later)
    console.log('Selected anime:', anime);
  };

  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
    setSearchQuery('');
    setShowFilters(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveSection('search');
    }
  };

  const toggleFavorite = (animeId: string) => {
    setFavorites(prev => 
      prev.includes(animeId) 
        ? prev.filter(id => id !== animeId)
        : [...prev, animeId]
    );
  };

  const isFavorite = (animeId: string) => favorites.includes(animeId);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard">
      <SnowEffect />
      
      {/* Header */}
      <header className="dashboard-header glass">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">AnimeNox</h1>
            <nav className="nav-sections">
              <button 
                className={`nav-btn ${activeSection === 'trending' ? 'active' : ''}`}
                onClick={() => handleSectionChange('trending')}
              >
                🔥 Trending
              </button>
              <button 
                className={`nav-btn ${activeSection === 'popular' ? 'active' : ''}`}
                onClick={() => handleSectionChange('popular')}
              >
                ⭐ Popular
              </button>
              <button 
                className={`nav-btn ${activeSection === 'ongoing' ? 'active' : ''}`}
                onClick={() => handleSectionChange('ongoing')}
              >
                📺 Ongoing
              </button>
              <button 
                className={`nav-btn ${activeSection === 'completed' ? 'active' : ''}`}
                onClick={() => handleSectionChange('completed')}
              >
                ✅ Completed
              </button>
            </nav>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-info">
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=667eea&color=fff`}
                  alt={user?.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <span className="greeting">{getGreeting()}</span>
                  <span className="user-name">{user?.name}</span>
                </div>
              </div>
              <button 
                className="logout-btn"
                onClick={signOut}
                title="Sign out"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-box glass">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Search anime... (e.g., One Piece, Naruto, Attack on Titan)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              title="Toggle filters"
            >
              ⚙️
            </button>
          </div>

          {showFilters && (
            <SearchFilters
              filters={{}}
              onFiltersChange={(filters) => {
                if (activeSection === 'search') {
                  searchAnime(searchQuery, filters);
                }
              }}
              availableGenres={ANIME_GENRES}
            />
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-info">
              <h2 className="section-title">
                {activeSection === 'trending' && '🔥 Trending Now'}
                {activeSection === 'popular' && '⭐ Popular Anime'}
                {activeSection === 'ongoing' && '📺 Currently Airing'}
                {activeSection === 'completed' && '✅ Completed Series'}
                {activeSection === 'search' && `🔍 Search Results for "${searchQuery}"`}
              </h2>
              <p className="section-description">
                {activeSection === 'trending' && 'Most popular anime right now'}
                {activeSection === 'popular' && 'All-time favorite anime series'}
                {activeSection === 'ongoing' && 'Anime currently releasing new episodes'}
                {activeSection === 'completed' && 'Finished anime series to binge watch'}
                {activeSection === 'search' && 'Found the following anime matching your search'}
              </p>
            </div>
            
            <div className="section-stats">
              <span className="anime-count">{anime.length} anime</span>
              <button 
                className="refresh-btn"
                onClick={refreshAnime}
                disabled={loading}
                title="Refresh"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
              <button onClick={refreshAnime}>Try Again</button>
            </div>
          )}

          {/* Anime Grid */}
          <AnimeGrid
            animeList={anime}
            onAnimeClick={handleAnimeClick}
            loading={loading}
            emptyMessage={
              activeSection === 'search' 
                ? `No anime found for "${searchQuery}"`
                : `No ${activeSection} anime available`
            }
          />

          {/* Load More Button */}
          {hasMore && !loading && anime.length > 0 && (
            <div className="load-more-section">
              <button 
                className="load-more-btn"
                onClick={loadMore}
                disabled={loading}
              >
                Load More Anime
              </button>
            </div>
          )}

          {/* Loading More Indicator */}
          {loading && anime.length > 0 && (
            <div className="loading-more">
              <LoadingSpinner size="small" text="Loading more anime..." />
            </div>
          )}
        </div>
      </main>

      {/* Quick Stats Footer */}
      <footer className="dashboard-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-number">{anime.length}</span>
            <span className="stat-label">Anime Loaded</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">Favorites</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{recentAnime.length}</span>
            <span className="stat-label">Recently Viewed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
