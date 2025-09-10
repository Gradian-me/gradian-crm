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
  headerSubtitle = "Welcome back, Mahyar",
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
        <SidebarInset className="flex-1 flex flex-col">
          <MainHeader
            title={headerTitle}
            subtitle={headerSubtitle}
            showOnlineBadge={showOnlineBadge}
            showScheduleButton={showScheduleButton}
            customActions={customHeaderActions}
          />
          <main className="flex-1 overflow-auto p-2 lg:p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 