# Deployment Guide

## Deploy to Vercel

### Quick Setup
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub account
4. Import your repository
5. Vercel will auto-detect it as a Vite project
6. Click Deploy

### Manual Configuration (if needed)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Environment Variables
No environment variables needed for this frontend-only version.

### Domain
After deployment, your app will be available at:
`https://your-project-name.vercel.app`

## Deploy to Netlify

### Quick Setup
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your GitHub account
4. Import your repository
5. Build settings will be auto-detected from `netlify.toml`
6. Click Deploy

### Manual Configuration
- Build Command: `npm run build`
- Publish Directory: `dist`

## Deploy to GitHub Pages

### Setup
1. Go to your GitHub repository
2. Settings → Pages
3. Source: GitHub Actions
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Local Development

### Requirements
- Node.js 18+
- Modern browser with microphone support

### Setup
```bash
git clone <your-repo>
cd voice-training-analyzer
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Troubleshooting

### HTTPS Required
The Web Audio API requires HTTPS in production. All deployment platforms (Vercel, Netlify, GitHub Pages) provide HTTPS by default.

### Microphone Permissions
Users need to grant microphone access for the app to work. The app will prompt for permissions automatically.

### Browser Compatibility
- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

## Features

✅ Real-time audio analysis
✅ Pitch detection and visualization
✅ Vocal tract SVG animation
✅ Mobile responsive design
✅ No backend required
✅ HTTPS ready