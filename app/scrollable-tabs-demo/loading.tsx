import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-2 md:p-4 lg:p-6">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>

        {/* Tabs skeleton */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
            </div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 