# DevScout

A modern React application for discovering and exploring open-source repositories, with a focus on Y Combinator-backed projects.

## Features

- 🔍 **Smart Search**: Search across all GitHub repositories
- 🏢 **YC-Backed Filter**: Toggle to show only Y Combinator-backed open source projects
- 🎯 **Language Filtering**: Filter repositories by programming language
- 📊 **Rich Data**: View stars, forks, descriptions, and more
- 🎨 **Modern UI**: Clean, minimal black and white design
- ⚡ **Fast Performance**: Optimized with caching and parallel requests

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Headless UI
- **Backend**: Node.js, Express, Axios
- **Deployment**: Vercel (Serverless Functions)

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DevScout
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Environment Variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Add your GitHub token (optional but recommended)
   # Get one from: https://github.com/settings/tokens
   ```

4. **Run the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/projects

## Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your DevScout repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add `GITHUB_TOKEN` with your GitHub token value
   - Redeploy the project

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   ```bash
   vercel env add GITHUB_TOKEN
   ```

## API Endpoints

- `GET /api/projects` - Get repositories
  - Query params:
    - `search` - Search term
    - `language` - Programming language filter
    - `yc` - Show only YC-backed repos (true/false)
    - `sort` - Sort by (stars, forks, updated)

## Project Structure

```
DevScout/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── package.json
├── backend/                 # Node.js backend
│   ├── api/                # Vercel serverless functions
│   ├── yc_orgs.json        # YC organization list
│   └── package.json
├── vercel.json             # Vercel configuration
└── README.md
```

## Performance Optimizations

- **Parallel API Requests**: YC org searches run in parallel
- **In-Memory Caching**: 5-minute cache for YC results
- **Request Timeouts**: 5-second timeout per API call
- **Bundle Optimization**: Vite build optimization
- **Code Splitting**: Automatic code splitting with Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details