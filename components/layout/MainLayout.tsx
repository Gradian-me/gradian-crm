"use client"

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { MainSidebar } from "./MainSidebar"
import { MainHeader } from "./MainHeader"

interface MainLayoutProps {
  children: React.ReactNode
  headerTitle?: string
  headerSubtitle?: string
  showOnlineBadge?: boolean
  showScheduleButton?: boolean
  customHeaderActions?: React.ReactNode
}

export function MainLayout({ 
  children, 
  headerTitle = "Dashboard",
  headerSubtitle = "Welcome back, John",
  showOnlineBadge = true,
  showScheduleButton = true,
  customHeaderActions
}: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border">
          <MainSidebar />
        </Sidebar>
        <SidebarInset className="flex-1">
          <MainHeader
            title={headerTitle}
            subtitle={headerSubtitle}
            showOnlineBadge={showOnlineBadge}
            showScheduleButton={showScheduleButton}
            customActions={customHeaderActions}
          />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 