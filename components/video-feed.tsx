"use client"

import { forwardRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RetryButton } from "@/components/retry-button"
import { Camera, CameraOff, AlertTriangle } from "lucide-react"

interface VideoFeedProps {
  cameraEnabled: boolean
  onEnableCamera: () => void
  onRetry?: () => void
  error?: string | null
  isRetrying?: boolean
}

export const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(({ 
  cameraEnabled, 
  onEnableCamera, 
  onRetry, 
  error, 
  isRetrying 
}, ref) => {
  return (
    <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
      {cameraEnabled ? (
        <div className="relative w-full h-full">
          <video ref={ref} autoPlay playsInline muted className="w-full h-full object-cover" />
          
          {/* Error overlay */}
          {error && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-sm mb-4">{error}</p>
                {onRetry && (
                  <RetryButton 
                    onRetry={onRetry} 
                    isLoading={isRetrying}
                    error={null}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <CameraOff className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Enable your camera to start emotion detection and enjoy personalized music based on your mood.
          </p>
          
          {error ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
              {onRetry && (
                <RetryButton 
                  onRetry={onRetry} 
                  isLoading={isRetrying}
                  error={null}
                />
              )}
            </div>
          ) : (
            <Button onClick={onEnableCamera} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Camera className="w-5 h-5 mr-2" />
              Enable Camera & Start
            </Button>
          )}
        </div>
      )}
    </div>
  )
})

VideoFeed.displayName = "VideoFeed"
