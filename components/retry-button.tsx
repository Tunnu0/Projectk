"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle } from "lucide-react"

interface RetryButtonProps {
  onRetry: () => void
  isLoading?: boolean
  error?: string | null
  className?: string
}

export function RetryButton({ onRetry, isLoading = false, error, className }: RetryButtonProps) {
  if (!error && !isLoading) {
    return null
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      
      <Button
        onClick={onRetry}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Retrying...' : 'Retry Detection'}
      </Button>
    </div>
  )
}
