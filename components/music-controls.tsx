"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, Volume2, Music, Loader2 } from "lucide-react"
import type { Emotion } from "@/hooks/use-emotion-detection"

interface Song {
  id: string
  title: string
  artist: string
  url: string
  emotion: Emotion
  genre: string
}

interface MusicControlsProps {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  isLoading?: boolean
  onPlayPause: () => void
  onNextSong: () => void
  onVolumeChange: (volume: number) => void
  currentEmotion: Emotion | null
}

const emotionColors = {
  happy: "bg-yellow-500",
  sad: "bg-blue-500",
  angry: "bg-red-500",
  surprised: "bg-purple-500",
  neutral: "bg-gray-500",
  fearful: "bg-orange-500",
  disgusted: "bg-green-500",
}

export function MusicControls({
  currentSong,
  isPlaying,
  volume,
  isLoading = false,
  onPlayPause,
  onNextSong,
  onVolumeChange,
  currentEmotion,
}: MusicControlsProps) {
  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0])
  }

  return (
    <div className="space-y-6">
      {/* Current Song Display */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Now Playing</h2>
        {currentSong ? (
          <div className="space-y-3">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              {isLoading ? (
                <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
              ) : (
                <Music className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-balance">{currentSong.title}</h3>
              <p className="text-muted-foreground">{currentSong.artist}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {currentSong.genre}
              </Badge>
              <Badge className={`text-xs text-white ${emotionColors[currentSong.emotion]}`}>
                {currentSong.emotion}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <Music className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-muted-foreground">No Song Selected</h3>
              <p className="text-muted-foreground text-sm">Enable camera to start</p>
            </div>
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={onPlayPause}
          disabled={!currentSong || isLoading}
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        <Button
          onClick={onNextSong}
          disabled={!currentSong || isLoading}
          variant="outline"
          size="lg"
          className="w-12 h-12 rounded-full bg-transparent"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Volume</span>
        </div>
        <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} min={0} step={0.1} className="w-full" />
        <div className="text-right text-xs text-muted-foreground">{Math.round(volume * 100)}%</div>
      </div>

      {/* Current Emotion Status */}
      {currentEmotion && (
        <Card className="p-4 bg-muted/50">
          <div className="text-center">
            <h4 className="font-medium mb-2">Detected Emotion</h4>
            <Badge className={`text-white ${emotionColors[currentEmotion]}`}>
              {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Music automatically selected based on your mood</p>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>🎵 Music changes based on your detected emotion</p>
        <p>📹 Make sure your face is visible to the camera</p>
        <p>🎧 Use headphones for the best experience</p>
      </div>
    </div>
  )
}
