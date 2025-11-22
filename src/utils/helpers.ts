import { Anime } from '@/types';

export const getImageWithFallback = (
  imageUrl: string | undefined, 
  fallbackUrl: string = 'https://images.unsplash.com/photo-1578632749014-ca77efd052eb?w=400&h=600&fit=crop'
): string => {
  if (!imageUrl || imageUrl.includes('null') || imageUrl.includes('undefined')) {
    return fallbackUrl;
  }
  return imageUrl;
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const sanitizeDescription = (description: string): string => {
  return description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
};

export const generateColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const sortAnime = (animeList: Anime[], sortBy: string): Anime[] => {
  const sorted = [...animeList];
  
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'latest':
      return sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'popularity':
    default:
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
};

export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

export const createSnowflake = (): void => {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerHTML = '❄';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
  snowflake.style.opacity = Math.random() * 0.6 + 0.4 + '';
  
  document.getElementById('snow-container')?.appendChild(snowflake);
  
  setTimeout(() => {
    snowflake.remove();
  }, 5000);
};
