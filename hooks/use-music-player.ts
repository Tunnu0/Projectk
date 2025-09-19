"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Emotion } from "./use-emotion-detection"

interface Song {
  id: string
  title: string
  artist: string
  url: string
  emotion: Emotion
  genre: string
}

// Enhanced emotion to song mapping with multiple tracks per emotion
const emotionSongs = {
  happy: [
    "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
    "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    "https://www.bensound.com/bensound-music/bensound-happiness.mp3"
  ],
  sad: [
    "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
    "https://www.bensound.com/bensound-music/bensound-sadday.mp3",
    "https://www.bensound.com/bensound-music/bensound-memories.mp3",
    "https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
  ],
  angry: [
    "https://www.bensound.com/bensound-music/bensound-extremeaction.mp3",
    "https://www.bensound.com/bensound-music/bensound-energy.mp3",
    "https://www.bensound.com/bensound-music/bensound-epic.mp3",
    "https://www.bensound.com/bensound-music/bensound-actionable.mp3"
  ],
  surprised: [
    "https://www.bensound.com/bensound-music/bensound-funkyelement.mp3",
    "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
    "https://www.bensound.com/bensound-music/bensound-thejazzpiano.mp3",
    "https://www.bensound.com/bensound-music/bensound-allthat.mp3"
  ],
  neutral: [
    "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
    "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
    "https://www.bensound.com/bensound-music/bensound-countryside.mp3"
  ],
  fearful: [
    "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
    "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    "https://www.bensound.com/bensound-music/bensound-littleidea.mp3"
  ],
  disgusted: [
    "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
    "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    "https://www.bensound.com/bensound-music/bensound-littleidea.mp3"
  ]
}

// Enhanced playlist with multiple songs per emotion
const PLAYLIST: Song[] = [
  // Happy songs (4 tracks)
  {
    id: "happy-1",
    title: "Sunny",
    artist: "Bensound",
    url: emotionSongs.happy[0],
    emotion: "happy",
    genre: "Upbeat Pop",
  },
  {
    id: "happy-2",
    title: "Ukulele",
    artist: "Bensound",
    url: emotionSongs.happy[1],
    emotion: "happy",
    genre: "Tropical",
  },
  {
    id: "happy-3",
    title: "Creative Minds",
    artist: "Bensound",
    url: emotionSongs.happy[2],
    emotion: "happy",
    genre: "Electronic",
  },
  {
    id: "happy-4",
    title: "Happiness",
    artist: "Bensound",
    url: emotionSongs.happy[3],
    emotion: "happy",
    genre: "Feel Good",
  },

  // Sad songs (4 tracks)
  {
    id: "sad-1",
    title: "Slow Motion",
    artist: "Bensound",
    url: emotionSongs.sad[0],
    emotion: "sad",
    genre: "Melancholic",
  },
  {
    id: "sad-2",
    title: "Sad Day",
    artist: "Bensound",
    url: emotionSongs.sad[1],
    emotion: "sad",
    genre: "Emotional",
  },
  {
    id: "sad-3",
    title: "Memories",
    artist: "Bensound",
    url: emotionSongs.sad[2],
    emotion: "sad",
    genre: "Nostalgic",
  },
  {
    id: "sad-4",
    title: "Tenderness",
    artist: "Bensound",
    url: emotionSongs.sad[3],
    emotion: "sad",
    genre: "Soft",
  },

  // Angry songs (4 tracks)
  {
    id: "angry-1",
    title: "Extreme Action",
    artist: "Bensound",
    url: emotionSongs.angry[0],
    emotion: "angry",
    genre: "Intense",
  },
  {
    id: "angry-2",
    title: "Energy",
    artist: "Bensound",
    url: emotionSongs.angry[1],
    emotion: "angry",
    genre: "High Energy",
  },
  {
    id: "angry-3",
    title: "Epic",
    artist: "Bensound",
    url: emotionSongs.angry[2],
    emotion: "angry",
    genre: "Dramatic",
  },
  {
    id: "angry-4",
    title: "Actionable",
    artist: "Bensound",
    url: emotionSongs.angry[3],
    emotion: "angry",
    genre: "Powerful",
  },

  // Surprised songs (4 tracks)
  {
    id: "surprised-1",
    title: "Funky Element",
    artist: "Bensound",
    url: emotionSongs.surprised[0],
    emotion: "surprised",
    genre: "Funky",
  },
  {
    id: "surprised-2",
    title: "Jazzy Frenchy",
    artist: "Bensound",
    url: emotionSongs.surprised[1],
    emotion: "surprised",
    genre: "Jazz",
  },
  {
    id: "surprised-3",
    title: "The Jazz Piano",
    artist: "Bensound",
    url: emotionSongs.surprised[2],
    emotion: "surprised",
    genre: "Piano Jazz",
  },
  {
    id: "surprised-4",
    title: "All That",
    artist: "Bensound",
    url: emotionSongs.surprised[3],
    emotion: "surprised",
    genre: "Swing",
  },

  // Neutral songs (4 tracks)
  {
    id: "neutral-1",
    title: "Better Days",
    artist: "Bensound",
    url: emotionSongs.neutral[0],
    emotion: "neutral",
    genre: "Calm",
  },
  {
    id: "neutral-2",
    title: "Acoustic Breeze",
    artist: "Bensound",
    url: emotionSongs.neutral[1],
    emotion: "neutral",
    genre: "Acoustic",
  },
  {
    id: "neutral-3",
    title: "Little Idea",
    artist: "Bensound",
    url: emotionSongs.neutral[2],
    emotion: "neutral",
    genre: "Ambient",
  },
  {
    id: "neutral-4",
    title: "Countryside",
    artist: "Bensound",
    url: emotionSongs.neutral[3],
    emotion: "neutral",
    genre: "Folk",
  },

  // Fearful songs (3 tracks - fallback to neutral)
  {
    id: "fearful-1",
    title: "Better Days",
    artist: "Bensound",
    url: emotionSongs.fearful[0],
    emotion: "fearful",
    genre: "Calm",
  },
  {
    id: "fearful-2",
    title: "Acoustic Breeze",
    artist: "Bensound",
    url: emotionSongs.fearful[1],
    emotion: "fearful",
    genre: "Soothing",
  },
  {
    id: "fearful-3",
    title: "Little Idea",
    artist: "Bensound",
    url: emotionSongs.fearful[2],
    emotion: "fearful",
    genre: "Peaceful",
  },

  // Disgusted songs (3 tracks - fallback to neutral)
  {
    id: "disgusted-1",
    title: "Better Days",
    artist: "Bensound",
    url: emotionSongs.disgusted[0],
    emotion: "disgusted",
    genre: "Calm",
  },
  {
    id: "disgusted-2",
    title: "Acoustic Breeze",
    artist: "Bensound",
    url: emotionSongs.disgusted[1],
    emotion: "disgusted",
    genre: "Clean",
  },
  {
    id: "disgusted-3",
    title: "Little Idea",
    artist: "Bensound",
    url: emotionSongs.disgusted[2],
    emotion: "disgusted",
    genre: "Fresh",
  },
]

export function useMusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume
    audioRef.current.crossOrigin = "anonymous"

    const audio = audioRef.current

    const handleEnded = () => {
      console.log("[v0] Song ended, playing next")
      // Will be handled by the nextSong function when called
    }

    const handleCanPlay = () => {
      console.log("[v0] Audio can play")
      setIsLoading(false)
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("[v0] Error auto-playing:", error)
          setIsPlaying(false)
        })
      }
    }

    const handleLoadStart = () => {
      console.log("[v0] Audio loading started")
      setIsLoading(true)
    }

    const handleError = (e: any) => {
      console.error("[v0] Audio error:", e)
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("error", handleError)
      audio.pause()
    }
  }, [])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      console.log("[v0] Volume updated to:", volume)
    }
  }, [volume])

  // Play/pause functionality
  const playPause = useCallback(async () => {
    if (!audioRef.current || !currentSong) {
      console.log("[v0] No audio or song available")
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        console.log("[v0] Audio paused")
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        console.log("[v0] Audio playing")
      }
    } catch (error) {
      console.error("[v0] Error playing audio:", error)
      setIsPlaying(false)
    }
  }, [isPlaying, currentSong])

  // Load and play a specific song
  const loadSong = useCallback(
    async (song: Song) => {
      if (!audioRef.current) return

      try {
        console.log("[v0] Loading song:", song.title)
        audioRef.current.src = song.url
        setCurrentSong(song)
        setIsLoading(true)

        // Auto-play if we were already playing
        if (isPlaying) {
          await audioRef.current.play()
        }
      } catch (error) {
        console.error("[v0] Error loading song:", error)
        setIsLoading(false)
      }
    },
    [isPlaying],
  )

  // Get songs for a specific emotion from API
  const getSongsForEmotion = useCallback(async (emotion: Emotion): Promise<Song[]> => {
    try {
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion,
          limit: 10, // Get more songs for variety
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success && result.songs) {
        console.log(`[v0] Retrieved ${result.songs.length} songs for emotion: ${emotion}`)
        return result.songs
      } else {
        throw new Error(result.message || 'Failed to get songs from API')
      }
    } catch (error) {
      console.error('[v0] Error fetching songs from API:', error)
      // Fallback to local playlist
      console.log('[v0] Falling back to local playlist')
      return PLAYLIST.filter((song) => song.emotion === emotion)
    }
  }, [])

  // Play emotion-based song
  const playEmotionBasedSong = useCallback(
    async (emotion: Emotion) => {
      try {
        const emotionSongs = await getSongsForEmotion(emotion)
        if (emotionSongs.length === 0) {
          console.log("[v0] No songs found for emotion:", emotion)
          return
        }

        // Don't change song if we're already playing the right emotion
        if (currentSong && currentSong.emotion === emotion) {
          console.log("[v0] Already playing song for emotion:", emotion)
          return
        }

        // Pick a random song from the emotion category
        const randomSong = emotionSongs[Math.floor(Math.random() * emotionSongs.length)]
        console.log("[v0] Playing emotion-based song:", randomSong.title, "for emotion:", emotion)

        setCurrentPlaylist(emotionSongs)
        setCurrentIndex(emotionSongs.findIndex((song) => song.id === randomSong.id))

        await loadSong(randomSong)

        // Auto-play the new emotion-based song
        if (audioRef.current) {
          try {
            await audioRef.current.play()
            setIsPlaying(true)
          } catch (error) {
            console.error("[v0] Error auto-playing emotion song:", error)
          }
        }
      } catch (error) {
        console.error("[v0] Error in playEmotionBasedSong:", error)
      }
    },
    [currentSong, getSongsForEmotion, loadSong],
  )

  // Next song functionality
  const nextSong = useCallback(async () => {
    if (currentPlaylist.length === 0) return

    const nextIndex = (currentIndex + 1) % currentPlaylist.length
    const nextSong = currentPlaylist[nextIndex]

    setCurrentIndex(nextIndex)
    await loadSong(nextSong)
  }, [currentPlaylist, currentIndex, loadSong])

  // Previous song functionality
  const previousSong = useCallback(async () => {
    if (currentPlaylist.length === 0) return

    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1
    const prevSong = currentPlaylist[prevIndex]

    setCurrentIndex(prevIndex)
    await loadSong(prevSong)
  }, [currentPlaylist, currentIndex, loadSong])

  return {
    currentSong,
    isPlaying,
    volume,
    currentPlaylist,
    isLoading,
    playPause,
    nextSong,
    previousSong,
    setVolume,
    playEmotionBasedSong,
    getSongsForEmotion,
  }
}
