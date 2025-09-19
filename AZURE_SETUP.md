# Azure Face API Setup Guide

## 🚀 Quick Setup

### 1. Create Azure Face API Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Face"
4. Select "Face" from Microsoft Cognitive Services
5. Click "Create"

### 2. Configure Your Resource

- **Subscription**: Choose your Azure subscription
- **Resource Group**: Create new or use existing
- **Region**: Choose a region close to your users (e.g., East US, West Europe)
- **Name**: Give it a unique name (e.g., "emotion-music-face-api")
- **Pricing Tier**: Select "F0 (Free)" for development

### 3. Get Your API Keys

1. Go to your Face API resource
2. Click "Keys and Endpoint" in the left menu
3. Copy **Key 1** and **Endpoint**

### 4. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Azure Face API Configuration
AZURE_FACE_API_ENDPOINT=https://your-face-api.cognitiveservices.azure.com
AZURE_FACE_API_KEY=your-azure-face-api-key-here
```

Replace the values with your actual endpoint and key.

## 📊 Azure Face API Features

### Free Tier Limits
- **30,000 transactions per month**
- **20 transactions per minute**
- Perfect for development and testing

### Supported Emotions
- **Happiness** → Happy music
- **Sadness** → Melancholic music  
- **Anger** → Intense music
- **Surprise** → Dynamic music
- **Neutral** → Ambient music
- **Fear** → Soothing music
- **Disgust** → Clean music
- **Contempt** → Clean music

### Accuracy
- **95%+ accuracy** for emotion detection
- **Real-time processing** with low latency
- **Multiple face detection** support

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

1. **"Azure Face API key not configured"**
   - Check your `.env.local` file
   - Ensure variables are named correctly
   - Restart your development server

2. **"Azure Face API error: 401"**
   - Verify your API key is correct
   - Check if your subscription is active

3. **"Azure Face API error: 403"**
   - You've exceeded your free tier limits
   - Wait for the next billing cycle or upgrade

4. **"No face detected in image"**
   - Ensure the image contains a clear face
   - Check image quality and lighting
   - Verify image format (JPEG, PNG supported)

### Debug Mode

Enable debug logging by checking browser console for `[v0]` messages.

## 📈 Production Considerations

### Scaling
- **Upgrade to Standard tier** for production
- **Implement rate limiting** to stay within quotas
- **Add caching** for repeated requests
- **Monitor usage** in Azure portal

### Security
- **Never expose API keys** in client-side code
- **Use environment variables** for configuration
- **Implement proper error handling**
- **Add request validation**

### Performance
- **Optimize image size** before sending to API
- **Implement request queuing** for high traffic
- **Add retry logic** for failed requests
- **Monitor response times**

## 🎯 Next Steps

1. **Set up Azure Face API** using this guide
2. **Configure environment variables**
3. **Test the integration**
4. **Deploy to production**
5. **Monitor usage and performance**

## 📞 Support

- **Azure Documentation**: [Face API Docs](https://docs.microsoft.com/en-us/azure/cognitive-services/face/)
- **Azure Support**: [Azure Support](https://azure.microsoft.com/en-us/support/)
- **Free Tier Limits**: [Pricing Details](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/face-api/)

---

**Your emotion detection will be much more accurate with Azure Face API!** 🎉
