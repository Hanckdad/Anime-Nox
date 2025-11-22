import React from 'react';
import { Anime } from '@/types';
import './AnimeCard.css';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  showProgress?: boolean;
  className?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ 
  anime, 
  onClick, 
  showProgress = true,
  className = '' 
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1578632749014-ca77efd052eb?w=400&h=600&fit=crop';
  };

  const handleClick = () => {
    onClick(anime);
  };

  const getStatusColor = (status: string) => {
    return status === 'ongoing' ? 'var(--accent-pink)' : 'var(--accent-blue)';
  };

  return (
    <div 
      className={`anime-card glass hover-lift ${className}`}
      onClick={handleClick}
      data-status={anime.status}
    >
      <div className="anime-card-image">
        <img 
          src={anime.image} 
          alt={anime.title}
          loading="lazy"
          onError={handleImageError}
        />
        
        {/* Overlay Badges */}
        <div className="anime-badges">
          <div 
            className="anime-status"
            style={{ backgroundColor: getStatusColor(anime.status) }}
          >
            {anime.status === 'ongoing' ? '🟢 Ongoing' : '✅ Completed'}
          </div>
          
          {anime.rating && (
            <div className="anime-rating">
              ⭐ {anime.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Progress Bar for Ongoing Anime */}
        {showProgress && anime.status === 'ongoing' && anime.currentEpisode && anime.totalEpisodes && (
          <div className="anime-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(anime.currentEpisode / anime.totalEpisodes) * 100}%` 
                }}
              ></div>
            </div>
            <span className="progress-text">
              EP {anime.currentEpisode}/{anime.totalEpisodes}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="anime-overlay">
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p className="overlay-text">Click to watch</p>
        </div>
      </div>

      <div className="anime-card-content">
        <h3 className="anime-title" title={anime.title}>
          {anime.title}
        </h3>
        
        <p className="anime-description">
          {anime.description.substring(0, 80)}
          {anime.description.length > 80 && '...'}
        </p>

        <div className="anime-meta">
          {anime.releaseDate && anime.releaseDate !== 'Unknown' && (
            <span className="meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              {new Date(anime.releaseDate).getFullYear()}
            </span>
          )}
          
          {anime.totalEpisodes && (
            <span className="meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
              </svg>
              {anime.totalEpisodes} eps
            </span>
          )}
        </div>

        <div className="anime-genres">
          {anime.genres.slice(0, 3).map(genre => (
            <span 
              key={genre} 
              className="genre-tag"
              style={{ 
                backgroundColor: `color-mix(in srgb, ${getStatusColor(anime.status)} 20%, transparent)` 
              }}
            >
              {genre}
            </span>
          ))}
          {anime.genres.length > 3 && (
            <span className="genre-tag more">
              +{anime.genres.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
