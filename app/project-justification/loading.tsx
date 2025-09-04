import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MainLayout } from "@/components/layout/MainLayout"

export default function Loading() {
  return (
    <MainLayout 
      headerTitle="Project Justification"
      headerSubtitle="Loading project test data..."
    >
      <div className="p-1 sm:p-2 md:p-4 lg:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Project Header Skeleton */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-96 bg-blue-400/30" />
                  <Skeleton className="h-4 w-64 bg-blue-400/20" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-8 w-16 bg-blue-400/30 ml-auto" />
                  <Skeleton className="h-4 w-20 bg-blue-400/20 ml-auto" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                    <Skeleton className="h-8 w-12 mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
            </div>

            {/* Content Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-6 rounded-xl border-2 bg-gradient-to-r from-white to-gray-50/50"
                      style={{ 
                        width: `${95 - i * 8}%`,
                        margin: "0 auto",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                      
                      <Skeleton className="h-3 w-full mb-4" />
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <div key={j} className="text-center p-2 bg-white/70 rounded-lg">
                            <Skeleton className="h-4 w-16 mx-auto mb-1" />
                            <Skeleton className="h-3 w-12 mx-auto" />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, k) => (
                          <div key={k} className="p-3 bg-white rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <Skeleton className="h-4 w-4" />
                                  <Skeleton className="h-4 w-48" />
                                </div>
                                <Skeleton className="h-3 w-32" />
                              </div>
                              <Skeleton className="h-6 w-16" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 