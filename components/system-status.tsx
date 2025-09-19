"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Activity } from "lucide-react"

interface SystemStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: number
  version: string
  services: {
    api: 'up' | 'down'
    emotionDetection: 'up' | 'down' | 'mock' | 'azure'
    musicRecommendation: 'up' | 'down'
    camera: 'available' | 'unavailable' | 'unknown'
  }
  performance: {
    uptime: number
    responseTime?: string
  }
  features: {
    realTimeDetection: boolean
    musicPlayback: boolean
    cameraAccess: boolean
    emotionHistory: boolean
  }
  azureFaceApi?: {
    configured: boolean
    endpoint: string
    features: string[]
  }
}

interface SystemStatusProps {
  className?: string
}

export function SystemStatus({ className }: SystemStatusProps) {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSystemStatus = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/health')
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }
      
      const data = await response.json()
      setStatus(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch system status')
      console.error('Error fetching system status:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemStatus()
    // Refresh status every 30 seconds
    const interval = setInterval(fetchSystemStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
      case 'available':
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'down':
      case 'unavailable':
      case 'unhealthy':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'mock':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'azure':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
      case 'available':
      case 'healthy':
        return 'bg-green-500'
      case 'down':
      case 'unavailable':
      case 'unhealthy':
        return 'bg-red-500'
      case 'mock':
        return 'bg-yellow-500'
      case 'azure':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load system status: {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSystemStatus}
              className="ml-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading system status...</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4" />
            System Status
          </h3>
          <div className="flex items-center gap-2">
            <Badge className={`text-white ${getStatusColor(status.status)}`}>
              {status.status.toUpperCase()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSystemStatus}
              disabled={isLoading}
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Services Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Services</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span>API</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.services.api)}
                <span className="capitalize">{status.services.api}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span>Emotion Detection</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.services.emotionDetection)}
                <span className="capitalize">{status.services.emotionDetection}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span>Music API</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.services.musicRecommendation)}
                <span className="capitalize">{status.services.musicRecommendation}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span>Camera</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(status.services.camera)}
                <span className="capitalize">{status.services.camera}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Response Time:</span>
              <span className="font-mono">{status.performance.responseTime || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="font-mono">{Math.round(status.performance.uptime)}s</span>
            </div>
          </div>
        </div>

        {/* Azure Face API Status */}
        {status.azureFaceApi && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Azure Face API</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>Configured</span>
                {status.azureFaceApi.configured ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-500" />
                )}
              </div>
              <div className="text-muted-foreground">
                {status.azureFaceApi.configured ? 'High accuracy detection' : 'Using fallback detection'}
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Features</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {Object.entries(status.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                {enabled ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Version {status.version} • Last updated: {new Date(status.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </Card>
  )
}
