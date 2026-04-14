import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserStats } from "@/types"

interface ProfileStatsProps {
  stats: UserStats
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    { label: "Bookmarks", value: stats.bookmarkCount },
    { label: "Collections", value: stats.collectionCount },
    { label: "Approved Submissions", value: stats.approvedSubmissions },
    { label: "Pending Submissions", value: stats.pendingSubmissions },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-1 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <p className="text-3xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
