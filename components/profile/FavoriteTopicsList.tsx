import { Badge } from "@/components/ui/badge"
import type { Category } from "@/types"

interface FavoriteTopicsListProps {
  topics: Array<{ category: Category; count: number }>
}

export default function FavoriteTopicsList({ topics }: FavoriteTopicsListProps) {
  if (topics.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Bookmark some questions to see your favorite topics.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map(({ category, count }) => (
        <div key={category.id} className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {category.name}
          </Badge>
          <span className="text-xs text-muted-foreground">{count}</span>
        </div>
      ))}
    </div>
  )
}
