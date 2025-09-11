"use client"

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { HeaderSkeleton } from "@/components/layout/HeaderSkeleton"
import { SidebarSkeleton } from "@/components/layout/SidebarSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingLayoutProps {
  children?: React.ReactNode
}

export function LoadingLayout({ children }: LoadingLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border">
          <SidebarSkeleton />
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col">
          <HeaderSkeleton />
          <main className="flex-1 overflow-auto p-2 lg:p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {children || (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 border rounded-lg">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-16 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 