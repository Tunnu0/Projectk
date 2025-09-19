import { NextRequest, NextResponse } from 'next/server'

export type Emotion = "happy" | "sad" | "angry" | "surprised" | "neutral" | "fearful" | "disgusted"

interface Song {
  id: string
  title: string
  artist: string
  url: string
  emotion: Emotion
  genre: string
  duration?: number
  description?: string
}

interface MusicRecommendationRequest {
  emotion: Emotion
  confidence?: number
  limit?: number
}

interface MusicRecommendationResponse {
  songs: Song[]
  emotion: Emotion
  totalSongs: number
  success: boolean
  message?: string
}

// Enhanced music database with more songs per emotion
const musicDatabase: Record<Emotion, Song[]> = {
  happy: [
    {
      id: "happy-1",
      title: "Sunny",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
      emotion: "happy",
      genre: "Upbeat Pop",
      duration: 180,
      description: "Bright and cheerful melody"
    },
    {
      id: "happy-2",
      title: "Ukulele",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
      emotion: "happy",
      genre: "Tropical",
      duration: 165,
      description: "Tropical vibes with ukulele"
    },
    {
      id: "happy-3",
      title: "Creative Minds",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
      emotion: "happy",
      genre: "Electronic",
      duration: 200,
      description: "Energetic electronic beats"
    },
    {
      id: "happy-4",
      title: "Happiness",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-happiness.mp3",
      emotion: "happy",
      genre: "Feel Good",
      duration: 175,
      description: "Pure joy and happiness"
    }
  ],
  sad: [
    {
      id: "sad-1",
      title: "Slow Motion",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
      emotion: "sad",
      genre: "Melancholic",
      duration: 190,
      description: "Gentle and emotional"
    },
    {
      id: "sad-2",
      title: "Sad Day",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-sadday.mp3",
      emotion: "sad",
      genre: "Emotional",
      duration: 170,
      description: "Reflective and touching"
    },
    {
      id: "sad-3",
      title: "Memories",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
      emotion: "sad",
      genre: "Nostalgic",
      duration: 185,
      description: "Nostalgic and bittersweet"
    },
    {
      id: "sad-4",
      title: "Tenderness",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3",
      emotion: "sad",
      genre: "Soft",
      duration: 160,
      description: "Gentle and tender"
    }
  ],
  angry: [
    {
      id: "angry-1",
      title: "Extreme Action",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-extremeaction.mp3",
      emotion: "angry",
      genre: "Intense",
      duration: 210,
      description: "High-energy and intense"
    },
    {
      id: "angry-2",
      title: "Energy",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
      emotion: "angry",
      genre: "High Energy",
      duration: 195,
      description: "Powerful and energetic"
    },
    {
      id: "angry-3",
      title: "Epic",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-epic.mp3",
      emotion: "angry",
      genre: "Dramatic",
      duration: 220,
      description: "Epic and dramatic"
    },
    {
      id: "angry-4",
      title: "Actionable",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-actionable.mp3",
      emotion: "angry",
      genre: "Powerful",
      duration: 180,
      description: "Strong and actionable"
    }
  ],
  surprised: [
    {
      id: "surprised-1",
      title: "Funky Element",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-funkyelement.mp3",
      emotion: "surprised",
      genre: "Funky",
      duration: 175,
      description: "Unexpected funky vibes"
    },
    {
      id: "surprised-2",
      title: "Jazzy Frenchy",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
      emotion: "surprised",
      genre: "Jazz",
      duration: 190,
      description: "Surprising jazz fusion"
    },
    {
      id: "surprised-3",
      title: "The Jazz Piano",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-thejazzpiano.mp3",
      emotion: "surprised",
      genre: "Piano Jazz",
      duration: 200,
      description: "Unexpected piano melodies"
    },
    {
      id: "surprised-4",
      title: "All That",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-allthat.mp3",
      emotion: "surprised",
      genre: "Swing",
      duration: 185,
      description: "Surprising swing rhythms"
    }
  ],
  neutral: [
    {
      id: "neutral-1",
      title: "Better Days",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
      emotion: "neutral",
      genre: "Calm",
      duration: 170,
      description: "Peaceful and balanced"
    },
    {
      id: "neutral-2",
      title: "Acoustic Breeze",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
      emotion: "neutral",
      genre: "Acoustic",
      duration: 165,
      description: "Gentle acoustic sounds"
    },
    {
      id: "neutral-3",
      title: "Little Idea",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
      emotion: "neutral",
      genre: "Ambient",
      duration: 180,
      description: "Subtle ambient music"
    },
    {
      id: "neutral-4",
      title: "Countryside",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-countryside.mp3",
      emotion: "neutral",
      genre: "Folk",
      duration: 175,
      description: "Natural and organic"
    }
  ],
  fearful: [
    {
      id: "fearful-1",
      title: "Better Days",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
      emotion: "fearful",
      genre: "Calm",
      duration: 170,
      description: "Soothing and reassuring"
    },
    {
      id: "fearful-2",
      title: "Acoustic Breeze",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
      emotion: "fearful",
      genre: "Soothing",
      duration: 165,
      description: "Gentle and calming"
    },
    {
      id: "fearful-3",
      title: "Little Idea",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
      emotion: "fearful",
      genre: "Peaceful",
      duration: 180,
      description: "Peaceful and safe"
    }
  ],
  disgusted: [
    {
      id: "disgusted-1",
      title: "Better Days",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
      emotion: "disgusted",
      genre: "Calm",
      duration: 170,
      description: "Clean and fresh"
    },
    {
      id: "disgusted-2",
      title: "Acoustic Breeze",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
      emotion: "disgusted",
      genre: "Clean",
      duration: 165,
      description: "Pure and clean sounds"
    },
    {
      id: "disgusted-3",
      title: "Little Idea",
      artist: "Bensound",
      url: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
      emotion: "disgusted",
      genre: "Fresh",
      duration: 180,
      description: "Fresh and revitalizing"
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    const body: MusicRecommendationRequest = await request.json()
    
    // Validate request
    if (!body.emotion) {
      return NextResponse.json({
        success: false,
        message: "Emotion is required"
      }, { status: 400 })
    }

    // Validate emotion
    if (!Object.keys(musicDatabase).includes(body.emotion)) {
      return NextResponse.json({
        success: false,
        message: `Invalid emotion. Supported emotions: ${Object.keys(musicDatabase).join(', ')}`
      }, { status: 400 })
    }

    const songs = musicDatabase[body.emotion]
    const limit = body.limit || songs.length
    const selectedSongs = songs.slice(0, Math.min(limit, songs.length))

    // Shuffle songs for variety
    const shuffledSongs = selectedSongs.sort(() => Math.random() - 0.5)

    const response: MusicRecommendationResponse = {
      songs: shuffledSongs,
      emotion: body.emotion,
      totalSongs: songs.length,
      success: true,
      message: `Found ${shuffledSongs.length} songs for ${body.emotion} emotion`
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in music recommendation API:', error)
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Music Recommendation API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/music - Get music recommendations based on emotion",
      GET: "/api/music - Get API information"
    },
    supportedEmotions: Object.keys(musicDatabase),
    totalSongs: Object.values(musicDatabase).reduce((total, songs) => total + songs.length, 0),
    songsPerEmotion: Object.entries(musicDatabase).reduce((acc, [emotion, songs]) => {
      acc[emotion] = songs.length
      return acc
    }, {} as Record<string, number>)
  })
}
