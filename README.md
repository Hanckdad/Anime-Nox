# 🎌 AnimeNox - Anime Streaming Platform

![AnimeNox Banner](https://images.unsplash.com/photo-1578632749014-ca77efd052eb?w=1200&h=400&fit=crop)

A modern, aesthetic anime streaming platform built with React, TypeScript, and Supabase. Features real-time anime data, beautiful UI with snow effects, and seamless user experience.

## ✨ Features

- 🎬 **Real Anime Data** - From multiple APIs (Consumet, AniList, Jikan)
- ❄️ **Aesthetic Design** - Glassmorphism UI with snow effects
- 🔐 **Secure Auth** - Google OAuth with Supabase
- 📱 **Responsive** - Works perfectly on all devices
- 🔍 **Smart Search** - Advanced filtering and search
- 💫 **Smooth Animations** - CSS animations and transitions
- 📚 **Watch History** - Track your progress
- ⭐ **Favorites** - Save your favorite anime
- 🆕 **Auto Updates** - Always fresh content

## 🚀 Live Demo

**🌐 Live Website:** [https://animenox.netlify.app](https://animenox.netlify.app)

## 📥 Installation & Setup

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Hanckdad/Anime-Nox/tree/main
cd Anime-Nox

# Install dependencies
npm install

# Start development server
npm run dev
```

Prerequisites

· Node.js 16 or higher
· npm or yarn
· Google account for OAuth

Environment Setup

1. Copy environment file:

```bash
cp .env.example .env
```

1. Edit .env file:

```env
VITE_SUPABASE_URL=https://zqlsbizhwaoepyayzjfp.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHNiaXpod2FvZXB5YXl6amZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTIxODcsImV4cCI6MjA3OTI4ODE4N30._tORF-SlnKIuqGK9wngkK5sw7mSIkDOOFaAwl74IsFs
```

Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

🛠 Tech Stack

Frontend:

· ⚛️ React 18 + TypeScript
· ⚡ Vite (Build Tool)
· 🎨 CSS3 with Glassmorphism
· 🧭 React Router

Backend & Services:

· 🔐 Supabase (Auth + Database)
· 📺 Consumet API
· 🎯 AniList GraphQL API
· ⭐ Jikan API (MyAnimeList)

Deployment:

· 🌐 Netlify (Frontend)
· 🗄️ Supabase (Backend)

🎯 Project Structure

```
Anime-Nox/
├── public/                 # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components (SnowEffect, LoadingSpinner)
│   │   ├── anime/        # Anime components (AnimeCard, AnimeGrid)
│   │   └── auth/         # Auth components (GoogleLogin)
│   ├── pages/            # Page components (Login, Dashboard)
│   ├── hooks/            # Custom React hooks (useAuth, useAnime)
│   ├── services/         # API services (animeService, supabase)
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript definitions
│   └── styles/           # CSS styles
├── package.json
├── vite.config.ts
├── netlify.toml
└── README.md
```

🔧 Configuration

Supabase Setup (Already Configured)

The project comes pre-configured with Supabase. No additional setup needed!

Pre-configured Settings:

· ✅ Database tables created
· ✅ Google OAuth enabled
· ✅ Row Level Security configured
· ✅ User profiles automated

Manual Supabase Setup (Optional)

If you want to use your own Supabase instance:

1. Create Supabase account at supabase.com
2. Create new project
3. Get credentials from Settings > API
4. Enable Google OAuth in Authentication > Settings
5. Run SQL schema:

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  watch_history JSONB DEFAULT '[]',
  subscriptions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  preferences JSONB DEFAULT '{
    "theme": "dark",
    "videoQuality": "720p",
    "autoPlay": true,
    "skipIntro": false,
    "language": "id"
  }'
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

📦 Deployment

Deploy to Netlify

Option 1: One-Click Deploy

https://www.netlify.com/img/deploy/button.svg

Option 2: Manual Deploy

1. Build the project:

```bash
npm run build
```

1. Drag & drop the dist folder to Netlify Drop
2. Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

Option 3: Git-based Deploy

1. Push your code to GitHub
2. Connect your repository in Netlify dashboard
3. Add environment variables in Netlify:
   · VITE_SUPABASE_URL
   · VITE_SUPABASE_KEY

Environment Variables for Production

Variable Description Example
VITE_SUPABASE_URL Your Supabase project URL https://xxx.supabase.co
VITE_SUPABASE_KEY Your Supabase anon key eyJhbGci...

🎮 Usage Guide

For Users

1. Visit the website
2. Click "Login with Google"
3. Browse anime by categories:
   · 🔥 Trending - Most popular now
   · ⭐ Popular - All-time favorites
   · 📺 Ongoing - Currently airing
   · ✅ Completed - Finished series
4. Use search and filters to find specific anime
5. Click on anime cards to view details
6. Enjoy watching! 🎉

For Developers

Adding New Components:

```typescript
// Example component structure
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="my-component glass" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};
```

Custom Hooks:

```typescript
// Example custom hook
export const useLocalData = (key: string, initialValue: any) => {
  const [value, setValue] = useLocalStorage(key, initialValue);
  // Your hook logic here
  return [value, setValue];
};
```

🔄 API Integration

AnimeNox uses multiple free APIs:

· 📺 Consumet API - Primary anime data and streaming links
· 🎯 AniList API - Trending and popular anime (GraphQL)
· ⭐ Jikan API - Anime schedule and additional info

All APIs are public and don't require API keys.

Adding New API Source

```typescript
// In src/services/animeService.ts
export const animeService = {
  async getNewSource(): Promise<Anime[]> {
    try {
      const response = await fetch('https://api.new-source.com/anime');
      const data = await response.json();
      return data.map(convertToAnimeFormat);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
};
```

🎨 Customization

Changing Theme Colors

Edit src/styles/globals.css:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  --secondary-gradient: linear-gradient(135deg, #48cae4 0%, #023e8a 100%);
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.25);
}
```

Modifying Snow Effect

Edit src/components/ui/SnowEffect.tsx:

```typescript
// Change snowflake count
const initialSnowflakes = Array.from({ length: 50 }, createSnowflake);

// Change animation speed
animationDuration: Math.random() * 8 + 4,
```

Adding New Sections

1. Add section to types:

```typescript
type DashboardSection = 'trending' | 'popular' | 'new-section';
```

1. Add service method:

```typescript
async getNewSection(): Promise<Anime[]> {
  // Your implementation
}
```

1. Update Dashboard component

🐛 Troubleshooting

Common Issues

1. Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

2. Supabase Connection Issues

· Check if Supabase project is active
· Verify environment variables
· Check browser console for errors

3. API Rate Limiting

· Wait a few minutes between requests
· Use fallback data during development

4. Styling Issues

· Check CSS variable definitions
· Verify class names in components

Debug Mode

Enable debug logging by adding to .env:

```env
VITE_DEBUG=true
```

🤝 Contributing

We love contributions! Here's how to help:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

1. Commit your changes

```bash
git commit -m 'Add amazing feature'
```

1. Push to the branch

```bash
git push origin feature/amazing-feature
```

1. Open a Pull Request

Contribution Areas

· 🐛 Bug fixes
· 🎨 UI/UX improvements
· 📱 Mobile optimization
· 🔧 Performance enhancements
· 📚 Documentation updates
· 🌐 New features

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

MIT License Summary:

· ✅ Commercial use allowed
· ✅ Modification allowed
· ✅ Distribution allowed
· ✅ Private use allowed
· ✅ No liability
· ✅ No warranty

🙏 Acknowledgments

· 📺 Consumet - For the comprehensive anime API
· 🎯 AniList - For the excellent GraphQL API
· ⭐ Jikan - For MyAnimeList data access
· 🔐 Supabase - For amazing auth and database
· 🎨 Unsplash - For beautiful placeholder images
· ⚛️ React Community - For the incredible ecosystem

📞 Support & Community

· 🐛 Report Bugs: GitHub Issues
· 💬 Discussions: GitHub Discussions
· 📧 Email: hanckdad@example.com
· 🐦 Twitter: @AnimeNoxApp

🚀 Future Plans

· 🎥 Video player improvements
· 📱 Progressive Web App (PWA)
· 🌙 Dark/Light theme toggle
· 🔔 Notification system
· 📊 Watch statistics
· 👥 Social features
· 📥 Download episodes
· 🌍 Multiple languages

---

👨‍💻 Developer

Bayu Official
Full Stack Developer

· GitHub: @Hanckdad
· Email: bayu@animenox.com
· Website: animenox.com

⭐ Show Your Support

If you find this project helpful, please give it a star! ⭐

```bash
# Star the repository
# Share with friends
# Contribute to development
```

---

Built with ❤️ and ☕ by Bayu Official

"Stream your anime dreams with AnimeNox" 🎌

```

## 🎯 SUMMARY: WEBSITE SIAP PAKAI!

### Yang Sudah Selesai:

✅ **Frontend Lengkap** - React + TypeScript + Vite  
✅ **Authentication** - Google OAuth dengan Supabase  
✅ **Real API Integration** - Consumet, AniList, Jikan  
✅ **Aesthetic UI** - Glassmorphism + Snow Effects  
✅ **Responsive Design** - Mobile & Desktop  
✅ **Advanced Features** - Search, Filters, Favorites  
✅ **Deployment Ready** - Netlify configuration  
✅ **Documentation** - README lengkap dengan instruksi  

### Link Penting:

- **🌐 Live Demo:** https://animenox.netlify.app
- **📂 GitHub:** https://github.com/Hanckdad/Anime-Nox/tree/main
- **🔐 Supabase:** https://supabase.com
- **🚀 Netlify:** https://netlify.com

### Cara Pakai:

1. **Clone & Install:**
```bash
git clone https://github.com/Hanckdad/Anime-Nox/tree/main
cd Anime-Nox
npm install
npm run dev
```

1. Atau langsung deploy ke Netlify:
   · Klik "Deploy to Netlify" button di README
   · Atau drag folder dist ke Netlify

Website sudah 100% functional dan siap production! 🚀🎉
