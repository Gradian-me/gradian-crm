"use client"

import * as React from "react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface MainHeaderProps {
  title: string
  subtitle?: string
  showOnlineBadge?: boolean
  showScheduleButton?: boolean
  customActions?: React.ReactNode
}

export function MainHeader({ 
  title, 
  subtitle, 
  showOnlineBadge = true, 
  showScheduleButton = true,
  customActions 
}: MainHeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 flex min-h-16 flex-col sm:flex-row items-start sm:items-center border-b border-border bg-gradient-subtle backdrop-blur supports-[backdrop-filter]:bg-gradient-subtle/90 transition-all duration-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-0 ${
      isScrolled ? 'shadow-lg shadow-violet-100/50' : 'shadow-sm shadow-violet-50/50'
    }`}>
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1 w-full sm:w-auto">
        <SidebarTrigger />
        <div className="min-w-0 flex-1">
          <h1 className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-balance break-words leading-tight pr-2 text-gradient">{title}</h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground break-words leading-tight mt-0.5 pr-2">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
        {showOnlineBadge && (
          <Badge variant="outline" className="gap-1 text-xs sm:text-sm whitespace-nowrap px-2 py-1 flex-shrink-0 min-w-fit border-green-300/50 bg-green-100/80 text-green-700 shadow-sm">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="hidden xs:inline sm:inline">Online</span>
            <span className="xs:hidden sm:hidden">●</span>
          </Badge>
        )}
        {showScheduleButton && (
          <Button size="sm" className="btn-gradient text-xs sm:text-sm whitespace-nowrap h-8 sm:h-9 px-2 sm:px-3 flex-shrink-0">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Schedule Visit</span>
            <span className="sm:hidden">Schedule</span>
          </Button>
        )}
        {customActions && (
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap flex-shrink-0">
            {customActions}
          </div>
        )}
      </div>
    </header>
  )
} 