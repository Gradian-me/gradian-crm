"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 flex min-h-16 flex-col sm:flex-row items-start sm:items-center border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95 transition-all duration-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-0 shadow-sm shadow-violet-50/50">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1 w-full sm:w-auto">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="hidden md:block h-8 w-[120px]" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-6 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </header>
  )
} 