"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { VideoFeed } from "@/components/video-feed"
import { EmotionDisplay } from "@/components/emotion-display"
import { MusicControls } from "@/components/music-controls"
import { PermissionHandler } from "@/components/permission-handler"
import { SystemStatus } from "@/components/system-status"
import { EmotionDebug } from "@/components/emotion-debug"
import { useEmotionDetection } from "@/hooks/use-emotion-detection"
import { useMusicPlayer } from "@/hooks/use-music-player"
import LiveCameraPreview from '../components/LiveCameraPreview'
// ...existing code...

// ...existing code...
async function getMicrophoneInput(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    return stream;
  } catch (err) {
    console.error("Error accessing microphone/camera:", err);
    throw err;
  }
}

export default function EmotionMusicApp() {
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [showPermissionHandler, setShowPermissionHandler] = useState(true)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { currentEmotion, confidence, isDetecting, emotionHistory, detectionCount, isModelLoaded, testDetection } = useEmotionDetection(videoRef, cameraEnabled)
  const { currentSong, isPlaying, volume, isLoading, playPause, nextSong, setVolume, playEmotionBasedSong } =
    useMusicPlayer()

  // Play emotion-based music when emotion changes
  useEffect(() => {
    console.log("[v0] Emotion changed:", currentEmotion, "confidence:", confidence)
    if (currentEmotion && confidence > 0.6) {
      console.log("[v0] Triggering emotion-based song for:", currentEmotion, "with confidence:", confidence)
      playEmotionBasedSong(currentEmotion)
    } else {
      console.log("[v0] Not triggering song - emotion:", currentEmotion, "confidence:", confidence)
    }
  }, [currentEmotion, confidence, playEmotionBasedSong])

  const handlePermissionsGranted = () => {
    console.log("[v0] Permissions granted")
    setPermissionGranted(true)
    setShowPermissionHandler(false)
    enableCamera()
  }

  const enableCamera = async () => {
    try {
      setIsRetrying(true)
      setCameraError(null)
      console.log("[v0] Enabling camera...")
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        console.log("[v0] Camera stream set to video element")
      }

      setCameraEnabled(true)
      setShowPermissionHandler(false)
    } catch (error) {
      console.error("[v0] Error accessing camera:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to access camera"
      setCameraError(errorMessage)
      setShowPermissionHandler(true)
    } finally {
      setIsRetrying(false)
    }
  }

  const retryCamera = async () => {
    setCameraError(null)
    await enableCamera()
  }

  // Debug functions
  const testEmotionDetection = () => {
    console.log('[v0] Manual test triggered')
    testDetection()
  }

  const forceMockDetection = () => {
    console.log('[v0] Forcing mock detection...')
    testDetection()
  }

  // Show permission handler if permissions not granted
  if (showPermissionHandler) {
    return <PermissionHandler onPermissionsGranted={handlePermissionsGranted} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Emotion Music Player</h1>
          <p className="text-muted-foreground text-lg">AI-powered music that matches your mood</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Feed Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border">
              <div className="relative">
                <VideoFeed 
                  ref={videoRef} 
                  cameraEnabled={cameraEnabled} 
                  onEnableCamera={enableCamera}
                  onRetry={retryCamera}
                  error={cameraError}
                  isRetrying={isRetrying}
                />

                {/* Emotion Overlay */}
                {cameraEnabled && !cameraError && (
                  <div className="absolute top-4 right-4">
                    <EmotionDisplay emotion={currentEmotion} confidence={confidence} isDetecting={isDetecting} />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Music Controls Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border h-full">
              <MusicControls
                currentSong={currentSong}
                isPlaying={isPlaying}
                volume={volume}
                isLoading={isLoading}
                onPlayPause={playPause}
                onNextSong={nextSong}
                onVolumeChange={setVolume}
                currentEmotion={currentEmotion}
              />
            </Card>
          </div>

          {/* System Status Section */}
          <div className="lg:col-span-1">
            <SystemStatus />
          </div>
        </div>

        {/* Debug Section */}
        <div className="mt-6">
          <EmotionDebug
            currentEmotion={currentEmotion}
            confidence={confidence}
            isDetecting={isDetecting}
            isModelLoaded={isModelLoaded}
            detectionCount={detectionCount}
            emotionHistory={emotionHistory}
            onTestDetection={testEmotionDetection}
            onForceMock={forceMockDetection}
          />
        </div>

        {/* Status Bar */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${cameraEnabled ? "bg-green-500" : "bg-red-500"}`} />
              Camera: {cameraEnabled ? "Active" : "Inactive"}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDetecting ? "bg-blue-500" : "bg-gray-500"}`} />
              AI Detection: {isDetecting ? "Running" : "Standby"}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-purple-500" : "bg-gray-500"}`} />
              Music: {isPlaying ? "Playing" : "Paused"}
            </div>
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Audio: Loading
              </div>
            )}
          </div>
          
          {/* Enhanced Debug Info */}
          <div className="mt-4 p-4 bg-muted/30 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-medium mb-3">Enhanced Emotion Detection Status</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p><strong>Current Emotion:</strong> {currentEmotion || "None"}</p>
                <p><strong>Confidence:</strong> {Math.round(confidence * 100)}%</p>
                <p><strong>Detection Count:</strong> {detectionCount}</p>
                <p><strong>Model Status:</strong> {isModelLoaded ? "✅ Loaded" : "⏳ Loading"}</p>
              </div>
              <div className="space-y-1">
                <p><strong>Current Song:</strong> {currentSong?.title || "None"}</p>
                <p><strong>Is Playing:</strong> {isPlaying ? "✅ Yes" : "❌ No"}</p>
                <p><strong>Song Genre:</strong> {currentSong?.genre || "N/A"}</p>
                <p><strong>History Length:</strong> {emotionHistory.length}</p>
              </div>
            </div>
            
            {/* Recent Emotion History */}
            {emotionHistory.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-xs mb-2">Recent Emotions:</h4>
                <div className="flex flex-wrap gap-1">
                  {emotionHistory.slice(-5).map((entry, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary/20 text-primary-foreground rounded text-xs"
                    >
                      {entry.emotion} ({Math.round(entry.confidence * 100)}%)
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Test Buttons */}
            <div className="mt-3 flex gap-2 flex-wrap">
              <button 
                onClick={() => {
                  const testEmotion = "happy" as const
                  console.log("[v0] Manual test - playing happy song")
                  playEmotionBasedSong(testEmotion)
                }}
                className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
              >
                Test Happy
              </button>
              <button 
                onClick={() => {
                  const testEmotion = "sad" as const
                  console.log("[v0] Manual test - playing sad song")
                  playEmotionBasedSong(testEmotion)
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Test Sad
              </button>
              <button 
                onClick={() => {
                  const testEmotion = "angry" as const
                  console.log("[v0] Manual test - playing angry song")
                  playEmotionBasedSong(testEmotion)
                }}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Test Angry
              </button>
              <button 
                onClick={() => {
                  const testEmotion = "surprised" as const
                  console.log("[v0] Manual test - playing surprised song")
                  playEmotionBasedSong(testEmotion)
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
              >
                Test Surprised
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
