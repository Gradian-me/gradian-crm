"use client"

export function SidebarSkeleton() {
  return (
    <div className="p-4">
      <div className="border-b border-border pb-4 mb-4">
        <div className="h-8 w-8 rounded bg-muted" />
        <div className="h-4 w-24 mt-2 rounded bg-muted" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
} 