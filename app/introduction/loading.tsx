import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-6" />
            <Skeleton className="h-16 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
            <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section Skeleton */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
            <Skeleton className="h-6 w-2/3 max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg bg-white/20" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded bg-white/20" />
                      <Skeleton className="h-4 w-20 bg-white/20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Skeleton className="h-10 w-96 mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-8" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-5 w-64" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Skeleton className="aspect-square rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section Skeleton */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-4" />
                <Skeleton className="h-5 w-20 mx-auto mb-1" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="h-10 w-96 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2 bg-white/20" />
          <Skeleton className="h-6 w-2/3 max-w-2xl mx-auto mb-8 bg-white/20" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-40 bg-white/20" />
            <Skeleton className="h-12 w-40 bg-white/20" />
          </div>
        </div>
      </section>
    </div>
  )
} 