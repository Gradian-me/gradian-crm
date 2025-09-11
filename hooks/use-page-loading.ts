"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading time for transitions
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return isLoading
} 