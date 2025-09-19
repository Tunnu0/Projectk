"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Emotion } from "@/hooks/use-emotion-detection"
import { Smile, Frown, Angry, Zap, Meh, Eye, X } from "lucide-react"

interface EmotionDisplayProps {
  emotion: Emotion | null
  confidence: number
  isDetecting: boolean
}

const emotionConfig = {
  happy: { icon: Smile, color: "bg-yellow-500", label: "Happy", textColor: "text-yellow-600" },
  sad: { icon: Frown, color: "bg-blue-500", label: "Sad", textColor: "text-blue-600" },
  angry: { icon: Angry, color: "bg-red-500", label: "Angry", textColor: "text-red-600" },
  surprised: { icon: Zap, color: "bg-purple-500", label: "Surprised", textColor: "text-purple-600" },
  neutral: { icon: Meh, color: "bg-gray-500", label: "Neutral", textColor: "text-gray-600" },
  fearful: { icon: Eye, color: "bg-orange-500", label: "Fearful", textColor: "text-orange-600" },
  disgusted: { icon: X, color: "bg-green-500", label: "Disgusted", textColor: "text-green-600" },
}

export function EmotionDisplay({ emotion, confidence, isDetecting }: EmotionDisplayProps) {
  if (!isDetecting) {
    return (
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
            <Meh className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Standby</p>
        </div>
      </Card>
    )
  }

  if (!emotion) {
    return (
      <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 animate-pulse">
            <Eye className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Detecting...</p>
        </div>
      </Card>
    )
  }

  const config = emotionConfig[emotion]
  const Icon = config.icon
  const confidencePercentage = Math.round(confidence * 100)

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
      <div className="text-center">
        <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center mx-auto mb-2`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className={`font-semibold ${config.textColor} mb-1`}>{config.label}</h3>
        <Badge variant="secondary" className="text-xs">
          {confidencePercentage}% confident
        </Badge>
      </div>
    </Card>
  )
}
