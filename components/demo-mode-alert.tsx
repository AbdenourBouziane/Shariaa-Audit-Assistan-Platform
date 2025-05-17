"use client"

import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DemoModeAlertProps {
  isVisible: boolean
  className?: string
}

export default function DemoModeAlert({ isVisible, className }: DemoModeAlertProps) {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4",
        className,
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Demo Mode Active</h3>
          <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
            <p>
              The application is running in demo mode with sample data. The backend server is either unavailable or not
              configured.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
