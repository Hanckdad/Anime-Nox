import React from 'react';
import { SearchFilters as SearchFiltersType } from '@/types';
import { ANIME_GENRES, ANIME_SEASONS } from '@/utils/constants';
import './SearchFilters.css';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  availableGenres?: string[];
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  availableGenres = ANIME_GENRES,
  className = ''
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query // Keep search query
    });
  };

  const hasActiveFilters = Object.keys(filters).some(
    key => key !== 'query' && filters[key as keyof SearchFiltersType]
  );

  return (
    <div className={`search-filters glass ${className}`}>
      <div className="filters-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button 
            className="clear-filters-btn"
            onClick={clearFilters}
            title="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="filters-grid">
        {/* Genre Filter */}
        <div className="filter-group">
          <label className="filter-label">Genre</label>
          <select
            value={filters.genre || ''}
            onChange={(e) => updateFilter('genre', e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">All Genres</option>
            {availableGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => updateFilter('status', e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-group">
          <label className="filter-label">Year</label>
          <select
            value={filters.year || ''}
            onChange={(e) => updateFilter('year', e.target.value ? parseInt(e.target.value) : undefined)}
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Season Filter */}
        <div className="filter-group">
          <label className="filter-label">Season</label>
          <select
            value={filters.season || ''}
            onChange={(e) => updateFilter('season', e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">All Seasons</option>
            {ANIME_SEASONS.map(season => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            value={filters.sortBy || 'popularity'}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="latest">Latest</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active Filters:</span>
          <div className="active-filters-tags">
            {filters.genre && (
              <span className="active-filter-tag">
                Genre: {filters.genre}
                <button onClick={() => updateFilter('genre', undefined)}>×</button>
              </span>
            )}
            {filters.status && (
              <span className="active-filter-tag">
                Status: {filters.status}
                <button onClick={() => updateFilter('status', undefined)}>×</button>
              </span>
            )}
            {filters.year && (
              <span className="active-filter-tag">
                Year: {filters.year}
                <button onClick={() => updateFilter('year', undefined)}>×</button>
              </span>
            )}
            {filters.season && (
              <span className="active-filter-tag">
                Season: {filters.season}
                <button onClick={() => updateFilter('season', undefined)}>×</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
