import React, { useEffect, useState } from 'react';
import './SnowEffect.css';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  opacity: number;
}

export const SnowEffect: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    const createSnowflake = (): Snowflake => ({
      id: Math.random(),
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 5,
      size: Math.random() * 8 + 6,
      opacity: Math.random() * 0.6 + 0.3,
    });

    // Initial snowflakes
    const initialSnowflakes = Array.from({ length: 30 }, createSnowflake);
    setSnowflakes(initialSnowflakes);

    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newSnowflakes = [...prev.slice(-40)]; // Keep only last 40
        newSnowflakes.push(createSnowflake());
        return newSnowflakes;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isEnabled]);

  const toggleSnow = () => {
    setIsEnabled(!isEnabled);
  };

  if (!isEnabled) return null;

  return (
    <>
      <div className="snow-container">
        {snowflakes.map(snowflake => (
          <div
            key={snowflake.id}
            className="snowflake"
            style={{
              left: `${snowflake.left}vw`,
              animationDuration: `${snowflake.animationDuration}s`,
              width: `${snowflake.size}px`,
              height: `${snowflake.size}px`,
              opacity: snowflake.opacity,
            }}
          >
            ❄
          </div>
        ))}
      </div>
      
      <button 
        className="snow-toggle"
        onClick={toggleSnow}
        title="Toggle Snow Effect"
      >
        {isEnabled ? '❄' : '🌞'}
      </button>
    </>
  );
};
