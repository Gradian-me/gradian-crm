"use client"

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
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold text-balance">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showOnlineBadge && (
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </Badge>
        )}
        {showScheduleButton && (
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Visit
          </Button>
        )}
        {customActions}
      </div>
    </header>
  )
} 