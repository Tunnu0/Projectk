# Google Cloud Vision Setup Guide

## 🚀 Quick Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Cloud Vision API for your project

### 2. Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name (e.g., "emotion-music-vision")
4. Grant the role "Cloud Vision API User"
5. Create and download the JSON key file

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Google Cloud Vision Configuration
GOOGLE_CLOUD_CREDENTIALS='{"type": "service_account", ... }' # Your entire service account JSON
```

**Important**: Copy the entire contents of your service account JSON file and paste it as a string in the `.env.local` file.

## 📊 Google Cloud Vision Features

### Free Tier Limits
- **1000 units per month free**
- **No rate limiting in free tier**
- Perfect for development and testing

### Supported Emotions
- **Joy** → Happy music
- **Sorrow** → Melancholic music
- **Anger** → Intense music
- **Surprise** → Dynamic music
- **Neutral** → Ambient music

### Additional Features
- **High accuracy face detection**
- **Real-time processing**
- **Multiple face detection support**
- **Advanced likelihood scoring**

## 🔧 Testing Your Setup

### 1. Test API Connection

```bash
# Test the emotion detection API
curl -X POST http://localhost:3000/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"emotion": "happy", "confidence": 0.8}'
```

### 2. Test with Real Image

```bash
# Test with base64 image data
curl -X POST http://localhost:3000/api/emotion \
  -H "Content-Type: application/json" \
  -d '{"imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."}'
```

### 3. Check API Status

```bash
# Check API information
curl http://localhost:3000/api/emotion
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Google Cloud Vision credentials not configured"**
   - Check your `.env.local` file
   - Ensure the GOOGLE_CLOUD_CREDENTIALS variable contains valid JSON
   - Verify the service account JSON is properly formatted
   - Restart your development server

2. **"Error: 7 PERMISSION_DENIED"**
   - Verify your service account has the correct role
   - Check if the Cloud Vision API is enabled
   - Ensure your credentials are valid
   - Verify your project has billing enabled

3. **"Cannot parse credentials"**
   - Check that your GOOGLE_CLOUD_CREDENTIALS is valid JSON
   - Ensure the entire service account key is included
   - Verify there are no line breaks in the env variable

### Security Notes

1. Never commit your `.env.local` file to version control
2. Keep your service account key secure
3. Follow the principle of least privilege when assigning roles
4. Consider using secret management in production

## 📚 Additional Resources

- [Google Cloud Vision Documentation](https://cloud.google.com/vision/docs)
- [Face Detection Guide](https://cloud.google.com/vision/docs/detecting-faces)
- [Best Practices](https://cloud.google.com/vision/docs/best-practices)
- [Pricing Information](https://cloud.google.com/vision/pricing)