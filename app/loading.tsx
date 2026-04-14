import { Skeleton } from "@/components/ui/skeleton"

function QuizCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card shadow-sm p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md shrink-0" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="space-y-2">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="h-11 w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <QuizCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
