import React from 'react';
import { Anime } from '@/types';
import { AnimeCard } from './AnimeCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import './AnimeGrid.css';

interface AnimeGridProps {
  animeList: Anime[];
  onAnimeClick: (anime: Anime) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({
  animeList,
  onAnimeClick,
  loading = false,
  emptyMessage = 'No anime found',
  className = ''
}) => {
  if (loading) {
    return (
      <div className="anime-grid-loading">
        <LoadingSpinner size="large" text="Loading anime..." />
      </div>
    );
  }

  if (animeList.length === 0) {
    return (
      <div className="anime-grid-empty">
        <div className="empty-icon">🎬</div>
        <h3>{emptyMessage}</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`anime-grid ${className}`}>
      {animeList.map((anime, index) => (
        <AnimeCard
          key={`${anime.id}-${index}`}
          anime={anime}
          onClick={onAnimeClick}
          className="fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};
