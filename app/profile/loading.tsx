import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      <div className="space-y-1">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>

      <section className="space-y-3">
        <Skeleton className="h-6 w-28" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-1">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-2">
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-3">
          {[1, 2].map((index) => (
            <div key={index} className="rounded-lg border px-4 py-3 flex justify-between gap-4">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-5 w-16 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
