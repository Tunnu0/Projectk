# Deployment Guide 🚀

This guide covers various deployment options for the Emotion Music App.

## 🎯 Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub
1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Next.js app
5. Click "Deploy" - no configuration needed!

### Option 2: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts
# - Link to existing project or create new
# - Configure settings (defaults work fine)
# - Deploy!
```

## 🌐 Other Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Configure redirects for Next.js routing

### AWS Amplify
1. Connect your GitHub repository
2. Amplify will auto-detect Next.js
3. Deploy with default build settings

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect and deploy
3. No additional configuration needed

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t emotion-music-app .
docker run -p 3000:3000 emotion-music-app
```

## ⚙️ Environment Configuration

### Production Environment Variables
Create these in your deployment platform:

```env
# Optional: Custom API endpoints
NEXT_PUBLIC_MUSIC_API_URL=https://your-api.com
NEXT_PUBLIC_EMOTION_API_URL=https://your-api.com

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Performance monitoring (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 🔧 Build Optimization

### Pre-deployment Checklist
- [ ] Run `npm run build` locally to ensure no build errors
- [ ] Test the production build with `npm start`
- [ ] Check that all API routes work correctly
- [ ] Verify camera permissions work in production
- [ ] Test emotion detection functionality
- [ ] Ensure music playback works

### Performance Optimizations
The app includes several built-in optimizations:
- **Image Optimization**: Next.js automatically optimizes images
- **Code Splitting**: Automatic code splitting for faster loading
- **Static Generation**: Static pages for better performance
- **CDN Ready**: Works with any CDN for global distribution

## 🛡️ Security Considerations

### HTTPS Required
- Camera access requires HTTPS in production
- Ensure your deployment platform provides SSL certificates
- Most platforms (Vercel, Netlify, etc.) provide this automatically

### CORS Configuration
The app is configured to work with:
- Same-origin requests (default)
- Custom API endpoints (if configured)

### Privacy Compliance
- No personal data is stored
- All processing happens client-side
- Camera feed never leaves the user's device

## 📊 Monitoring & Analytics

### Built-in Health Checks
The app includes a health check endpoint at `/api/health` that monitors:
- API status
- Emotion detection service
- Music recommendation service
- Camera availability
- System performance

### Custom Analytics
Add your analytics provider in the environment variables:
```env
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 🐛 Troubleshooting Deployment

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm install
   npm run build
   ```

2. **Camera Not Working in Production**
   - Ensure HTTPS is enabled
   - Check browser console for permission errors
   - Verify camera permissions are granted

3. **API Routes Not Working**
   - Check that all API files are in the correct location
   - Verify environment variables are set
   - Check server logs for errors

4. **Music Not Loading**
   - Verify music URLs are accessible
   - Check CORS settings if using external APIs
   - Ensure audio autoplay policies are handled

### Debug Mode
Enable debug logging by checking browser console for `[v0]` prefixed messages.

## 📈 Scaling Considerations

### For High Traffic
- Use a CDN for static assets
- Consider serverless functions for API routes
- Implement caching for music recommendations
- Use a load balancer for multiple instances

### Database Integration (Optional)
To add persistent storage:
1. Add a database (PostgreSQL, MongoDB, etc.)
2. Create database models for user preferences
3. Implement user authentication
4. Store emotion history and music preferences

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

If you encounter deployment issues:
1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check the application logs
4. Create an issue with deployment details

---

**Happy Deploying! 🚀**
