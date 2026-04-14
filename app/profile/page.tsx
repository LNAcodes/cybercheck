import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserStats, getUserSubmissions, getFavoriteTopics } from "@/actions/submissions"
import ProfileStats from "@/components/profile/ProfileStats"
import FavoriteTopicsList from "@/components/profile/FavoriteTopicsList"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
}

const STATUS_VARIANT: Record<string, "secondary" | "outline" | "destructive"> = {
  PENDING: "secondary",
  APPROVED: "outline",
  REJECTED: "destructive",
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  const [stats, submissions, favoriteTopics] = await Promise.all([
    getUserStats(),
    getUserSubmissions(),
    getFavoriteTopics(),
  ])

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">{session.user.username}</h2>
        <p className="text-muted-foreground text-sm">{session.user.email}</p>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-3">Your Stats</h3>
        <ProfileStats stats={stats} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Favorite Topics</h3>
        <FavoriteTopicsList topics={favoriteTopics} />
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-semibold mb-4">Your Submissions</h3>
        {submissions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t submitted any questions yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="rounded-lg border px-4 py-3 flex items-start justify-between gap-4"
              >
                <p className="text-sm leading-snug flex-1">{submission.questionText}</p>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={STATUS_VARIANT[submission.status] ?? "secondary"}>
                    {submission.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {DIFFICULTY_LABEL[submission.difficulty] ?? submission.difficulty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
