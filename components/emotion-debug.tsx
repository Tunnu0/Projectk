"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Play, Pause, Camera, AlertTriangle } from "lucide-react"
import type { Emotion } from "@/hooks/use-emotion-detection"

interface EmotionDebugProps {
  currentEmotion: Emotion | null
  confidence: number
  isDetecting: boolean
  isModelLoaded: boolean
  detectionCount: number
  emotionHistory: Array<{ emotion: Emotion; confidence: number; timestamp: number }>
  onTestDetection: () => void
  onForceMock: () => void
}

export function EmotionDebug({
  currentEmotion,
  confidence,
  isDetecting,
  isModelLoaded,
  detectionCount,
  emotionHistory,
  onTestDetection,
  onForceMock,
}: EmotionDebugProps) {
  const [showHistory, setShowHistory] = useState(false)

  const getStatusColor = (status: boolean) => {
    return status ? "bg-green-500" : "bg-red-500"
  }

  const getEmotionColor = (emotion: Emotion | null) => {
    if (!emotion) return "bg-gray-500"
    const colors = {
      happy: "bg-yellow-500",
      sad: "bg-blue-500",
      angry: "bg-red-500",
      surprised: "bg-purple-500",
      neutral: "bg-gray-500",
      fearful: "bg-orange-500",
      disgusted: "bg-green-500",
    }
    return colors[emotion] || "bg-gray-500"
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Emotion Detection Debug
        </h3>
        <div className="flex gap-2">
          <Button onClick={onTestDetection} size="sm" variant="outline">
            <RefreshCw className="w-3 h-3 mr-1" />
            Test
          </Button>
          <Button onClick={onForceMock} size="sm" variant="outline">
            <Play className="w-3 h-3 mr-1" />
            Force Mock
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
          <span>Model Loaded</span>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(isModelLoaded)}`} />
            <span>{isModelLoaded ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
          <span>Detecting</span>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(isDetecting)}`} />
            <span>{isDetecting ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
          <span>Detection Count</span>
          <Badge variant="secondary">{detectionCount}</Badge>
        </div>
        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
          <span>History Length</span>
          <Badge variant="secondary">{emotionHistory.length}</Badge>
        </div>
      </div>

      {/* Current Emotion */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Current Emotion</h4>
        {currentEmotion ? (
          <div className="flex items-center gap-2">
            <Badge className={`text-white ${getEmotionColor(currentEmotion)}`}>
              {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {Math.round(confidence * 100)}% confidence
            </span>
          </div>
        ) : (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>No emotion detected</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Emotion History */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Recent Emotions</h4>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            size="sm"
            variant="ghost"
          >
            {showHistory ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
        </div>
        
        {showHistory && emotionHistory.length > 0 && (
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {emotionHistory.slice(-5).map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <Badge className={`text-white ${getEmotionColor(entry.emotion)}`}>
                    {entry.emotion}
                  </Badge>
                  <span>{Math.round(entry.confidence * 100)}%</span>
                </div>
                <span className="text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {emotionHistory.length === 0 && (
          <p className="text-xs text-muted-foreground">No emotion history yet</p>
        )}
      </div>

      {/* Debug Instructions */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Debug Steps:</strong></p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Check browser console for [v0] messages</li>
          <li>Ensure camera permissions are granted</li>
          <li>Try "Force Mock" to test mock detection</li>
          <li>Check if models are loading properly</li>
        </ol>
      </div>
    </Card>
  )
}
