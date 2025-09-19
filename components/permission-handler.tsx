"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, AlertTriangle, CheckCircle } from "lucide-react"

interface PermissionHandlerProps {
  onPermissionsGranted: () => void
}

export function PermissionHandler({ onPermissionsGranted }: PermissionHandlerProps) {
  const [cameraPermission, setCameraPermission] = useState<PermissionState | null>(null)
  const [audioPermission, setAudioPermission] = useState<PermissionState | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check current permissions
  const checkPermissions = async () => {
    try {
      if ("permissions" in navigator) {
        const cameraResult = await navigator.permissions.query({ name: "camera" as PermissionName })
        const micResult = await navigator.permissions.query({ name: "microphone" as PermissionName })

        setCameraPermission(cameraResult.state)
        setAudioPermission(micResult.state)

        // Auto-proceed if permissions are already granted
        if (cameraResult.state === "granted") {
          onPermissionsGranted()
        }
      }
    } catch (error) {
      console.error("[v0] Error checking permissions:", error)
    }
  }

  // Request permissions
  const requestPermissions = async () => {
    setIsChecking(true)
    setError(null)

    try {
      // Request camera access (microphone is optional for this app)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false, // We don't need microphone for emotion detection
      })

      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach((track) => track.stop())

      setCameraPermission("granted")
      onPermissionsGranted()
    } catch (error: any) {
      console.error("[v0] Permission request failed:", error)

      if (error.name === "NotAllowedError") {
        setError(
          "Camera access was denied. Please enable camera permissions in your browser settings and refresh the page.",
        )
        setCameraPermission("denied")
      } else if (error.name === "NotFoundError") {
        setError("No camera found. Please connect a camera and try again.")
      } else if (error.name === "NotSupportedError") {
        setError("Camera access is not supported in this browser.")
      } else {
        setError("Failed to access camera. Please check your camera settings and try again.")
      }
    } finally {
      setIsChecking(false)
    }
  }

  // Check permissions on mount
  useEffect(() => {
    checkPermissions()
  }, [])

  const getPermissionIcon = (permission: PermissionState | null) => {
    switch (permission) {
      case "granted":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "denied":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getPermissionText = (permission: PermissionState | null) => {
    switch (permission) {
      case "granted":
        return "Granted"
      case "denied":
        return "Denied"
      case "prompt":
        return "Required"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 bg-card border-border">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Camera Access Required</h1>
          <p className="text-muted-foreground">
            This app uses your camera to detect emotions and play matching music. Your video never leaves your device.
          </p>
        </div>

        {/* Permission Status */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Camera</span>
            </div>
            <div className="flex items-center gap-2">
              {getPermissionIcon(cameraPermission)}
              <span className="text-sm">{getPermissionText(cameraPermission)}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action Button */}
        <div className="space-y-4">
          <Button
            onClick={requestPermissions}
            disabled={isChecking || cameraPermission === "granted"}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            {isChecking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Requesting Access...
              </>
            ) : cameraPermission === "granted" ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Access Granted
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Enable Camera Access
              </>
            )}
          </Button>

          {cameraPermission === "denied" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Camera access was denied. To use this app:</p>
              <ol className="text-xs text-muted-foreground text-left space-y-1">
                <li>1. Click the camera icon in your browser's address bar</li>
                <li>2. Select "Allow" for camera access</li>
                <li>3. Refresh this page</li>
              </ol>
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Privacy & Security</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Your video is processed locally on your device</li>
            <li>• No video data is sent to any servers</li>
            <li>• Emotion detection happens in your browser</li>
            <li>• You can revoke permissions at any time</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
