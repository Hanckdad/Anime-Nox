import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@/components/auth/GoogleLogin';
import { SnowEffect } from '@/components/ui/SnowEffect';
import './Login.css';

export const Login: React.FC = () => {
  const { signInWithGoogle, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <SnowEffect />
      
      <div className="login-container">
        <div className="login-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="login-content">
          <div className="login-card glass">
            {/* Header */}
            <div className="login-header">
              <div className="logo-container">
                <h1 className="logo-text neon-glow">AnimeNox</h1>
                <div className="logo-subtitle">Stream Your Dreams</div>
              </div>
            </div>

            {/* Features */}
            <div className="features-section">
              <div className="feature-grid">
                <div className="feature-item floating">
                  <div className="feature-icon">🎬</div>
                  <div className="feature-content">
                    <h3>Unlimited Anime</h3>
                    <p>Thousands of anime series and movies</p>
                  </div>
                </div>

                <div className="feature-item floating" style={{ animationDelay: '0.2s' }}>
                  <div className="feature-icon">📺</div>
                  <div className="feature-content">
                    <h3>HD Quality</h3>
                    <p>Crystal clear streaming experience</p>
                  </div>
                </div>

                <div className="feature-item floating" style={{ animationDelay: '0.4s' }}>
                  <div className="feature-icon">💾</div>
                  <div className="feature-content">
                    <h3>Watch History</h3>
                    <p>Continue where you left off</p>
                  </div>
                </div>

                <div className="feature-item floating" style={{ animationDelay: '0.6s' }}>
                  <div className="feature-icon">⭐</div>
                  <div className="feature-content">
                    <h3>Personalized</h3>
                    <p>Recommendations just for you</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="login-section">
              {error && (
                <div className="error-message">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <GoogleLogin 
                onLogin={handleLogin}
                loading={loading}
              />

              <div className="login-footer">
                <p className="privacy-note">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
