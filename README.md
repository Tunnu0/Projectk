# Emotion-Based Music Player 🎵😊

A sophisticated web application that uses AI-powered emotion detection to automatically play music that matches your current mood. Built with Next.js, TensorFlow.js, and modern web technologies.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Emotion Detection**: Uses TensorFlow.js and face-api.js to detect emotions from your camera feed
- **Smart Music Recommendation**: Automatically selects music based on detected emotions
- **Seamless Audio Playback**: High-quality music streaming with smooth transitions
- **Live Camera Preview**: Real-time video feed with emotion overlay

### 🎭 Supported Emotions
- **Happy** 🟡 - Upbeat, cheerful music
- **Sad** 🔵 - Melancholic, comforting tracks
- **Angry** 🔴 - Intense, energetic music
- **Surprised** 🟣 - Dynamic, unexpected melodies
- **Neutral** ⚪ - Calm, ambient sounds
- **Fearful** 🟠 - Soothing, reassuring music
- **Disgusted** 🟢 - Clean, fresh sounds

### 🛠️ Technical Features
- **API-First Architecture**: RESTful APIs for emotion detection and music recommendation
- **Fallback Systems**: Multiple detection methods with graceful degradation
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **System Monitoring**: Real-time system status and health checks
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Privacy-Focused**: All processing happens locally on your device

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Modern web browser with camera support
- Internet connection for music streaming

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emotion-music-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Frontend (Next.js)
- **App Router**: Modern Next.js 14 with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with dark mode support
- **Radix UI**: Accessible component primitives

### Backend APIs
- **Emotion Detection API** (`/api/emotion`): Processes emotion detection requests
- **Music Recommendation API** (`/api/music`): Returns music based on emotions
- **Health Check API** (`/api/health`): System status and monitoring

### AI/ML Integration
- **TensorFlow.js**: Client-side machine learning
- **face-api.js**: Face detection and emotion recognition
- **Fallback Detection**: Mock detection when models fail to load

## 📁 Project Structure

```
emotion-music-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── emotion/       # Emotion detection endpoint
│   │   ├── music/         # Music recommendation endpoint
│   │   └── health/        # System health endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── emotion-display.tsx
│   ├── music-controls.tsx
│   ├── permission-handler.tsx
│   ├── retry-button.tsx
│   ├── system-status.tsx
│   └── video-feed.tsx
├── hooks/                # Custom React hooks
│   ├── use-emotion-detection.ts
│   ├── use-music-player.ts
│   └── use-toast.ts
├── lib/                  # Utility functions
│   └── utils.ts
└── public/               # Static assets
```

## 🎵 Music Sources

The application uses high-quality royalty-free music from Bensound:
- **Happy**: Sunny, Ukulele, Creative Minds, Happiness
- **Sad**: Slow Motion, Sad Day, Memories, Tenderness
- **Angry**: Extreme Action, Energy, Epic, Actionable
- **Surprised**: Funky Element, Jazzy Frenchy, The Jazz Piano, All That
- **Neutral**: Better Days, Acoustic Breeze, Little Idea, Countryside

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:

```env
# Optional: Custom music API endpoints
NEXT_PUBLIC_MUSIC_API_URL=https://your-music-api.com
NEXT_PUBLIC_EMOTION_API_URL=https://your-emotion-api.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Customization
- **Music Sources**: Modify the music database in `app/api/music/route.ts`
- **Emotion Thresholds**: Adjust confidence thresholds in `hooks/use-emotion-detection.ts`
- **UI Theme**: Customize colors in `app/globals.css`

## 🛡️ Privacy & Security

- **Local Processing**: All emotion detection happens in your browser
- **No Data Storage**: No personal data is stored or transmitted
- **Camera Privacy**: Video feed never leaves your device
- **Secure APIs**: All API endpoints include proper error handling

## 🐛 Troubleshooting

### Common Issues

1. **Camera Not Working**
   - Ensure camera permissions are granted
   - Check if another application is using the camera
   - Try refreshing the page

2. **Emotion Detection Not Working**
   - The app will fallback to mock detection if models fail to load
   - Check browser console for error messages
   - Ensure you have a stable internet connection

3. **Music Not Playing**
   - Check browser autoplay policies
   - Ensure audio is not muted
   - Try clicking the play button manually

4. **Build Errors**
   - Clear `.next` folder and rebuild
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

### Debug Mode
Enable debug logging by opening browser console and looking for `[v0]` prefixed messages.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bensound** for providing royalty-free music
- **TensorFlow.js** team for the machine learning framework
- **face-api.js** for emotion detection capabilities
- **Next.js** team for the amazing React framework
- **Radix UI** for accessible component primitives

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

**Made with ❤️ for music lovers and emotion enthusiasts**
