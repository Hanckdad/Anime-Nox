# 🎌AnimeNox Frontend

https://iili.io/fK2Whns.md.jpg

A modern, aesthetic anime streaming platform built with Next.js, TypeScript, and Supabase. Features beautiful UI with snow effects, real-time anime data, and seamless user experience.

Features

· High Quality Streaming - 1080p/720p with multiple servers
· Google Authentication - Secure login with Google OAuth
· Watch History - Auto-save progress and continue watching
· Subscription System - Get notified for new episodes
· Download Manager - Track and manage your downloads
· Aesthetic Design - Beautiful dark theme with smooth animations
· Snow Effect Profile - Animated snow effect on user profiles
· Fully Responsive - Works perfectly on all devices
· Real-time Updates - Auto-update with new anime episodes

Live Demo

Live Website: https://animenox.vercel.app
Backend API:https://anime-nox-backend-production.up.railway.app

Quick Deploy

https://vercel.com/button
https://www.netlify.com/img/deploy/button.svg
https://railway.app/button.svg

Installation & Setup

Quick Start

```bash
# Clone the repository
git clone https://github.com/hanckdad/animenox.git
cd animenox/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Prerequisites

· Node.js 18 or higher
· npm or yarn
· Google account for OAuth

Environment Setup

1. Create .env.local file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zqlsbizhwaoepyayzjfp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHNiaXpod2FvZXB5YXl6amZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzcxMjE4NywiZXhwIjoyMDc5Mjg4MTg3fQ.jBjomFYoJpuiYSPrT36DQbzSLYDwJjj0npxtwsl3rVs
NEXT_PUBLIC_BACKEND_URL=https://anime-nox-backend-production.up.railway.app
```

Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Tech Stack

Frontend

· Framework: Next.js 14 with TypeScript
· Styling: Tailwind CSS with custom design system
· Authentication: Supabase Auth with Google OAuth
· Video Player: Video.js with custom UI
· Icons: Lucide React
· Animations: Framer Motion
· HTTP Client: Axios

Backend

· Runtime: Node.js with Express
· Database: Supabase PostgreSQL
· Caching: Node-cache
· Security: Helmet, CORS, Rate Limiting

APIs Used

· Anime API: Sankavollerei Anime API
· Image Hosting: Multiple CDN sources
· Video Sources: Multiple streaming servers

Project Structure

```
frontend/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── Anime/
│   │   └── AnimeCard.tsx
│   ├── Video/
│   │   └── VideoPlayer.tsx
│   ├── Profile/
│   │   └── SnowProfile.tsx
│   └── UI/
│       └── Section.tsx
├── pages/
│   ├── index.tsx
│   ├── login.tsx
│   ├── profile.tsx
│   ├── anime/
│   │   └── [slug].tsx
│   └── watch/
│       └── [slug].tsx
├── contexts/
│   └── AuthContext.tsx
├── utils/
│   ├── api.ts
│   └── supabase.ts
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

Usage

For Users

1. Visit the deployed website
2. Login with your Google account
3. Browse anime library or use search
4. Watch episodes with auto-save progress
5. Subscribe to get updates for favorite anime
6. Download episodes for offline viewing

For Developers

```bash
# Set up both frontend and backend
cd frontend && npm install
cd ../backend && npm install

# Run development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

Configuration

Database Setup

1. Create a Supabase project
2. Run the SQL schema from backend/scripts/initDB.js
3. Enable Google OAuth in Supabase Authentication
4. Configure Row Level Security policies

Deployment

Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Railway

```bash
npm install -g @railway/cli
railway deploy
```

API Endpoints

Public Endpoints

· GET /api/anime/home - Homepage anime data
· GET /api/anime/search/:keyword - Search anime
· GET /api/anime/ongoing-anime - Currently airing anime
· GET /api/anime/recent-updates - Recently updated anime

Protected Endpoints

· POST /api/user/watch-history - Save watch progress
· GET /api/user/continue-watching - Get continue watching list
· POST /api/subscription/subscribe - Subscribe to anime
· POST /api/download/track - Track downloads

Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments

· Anime API: Sankavollerei for providing anime data
· Icons: Lucide React
· UI Inspiration: Modern anime streaming platforms
· Deployment: Vercel, Netlify, and Railway for amazing hosting services

Support

· Developer: Bayu Official
· GitHub: @hanckdad
· Issues: GitHub Issues

---

Made with by Bayu Official

Back to Top