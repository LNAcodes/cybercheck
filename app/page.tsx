import { auth } from "@/lib/auth"
import { getApprovedQuestions } from "@/actions/questions"
import { getBookmarkedQuestionIds, toggleBookmark } from "@/actions/bookmarks"
import { getUserCollections } from "@/actions/collections"
import QuizGrid from "@/components/quiz/QuizGrid"

export default async function HomePage() {
  const [session, questions] = await Promise.all([auth(), getApprovedQuestions()])

  const [bookmarkedIds, userCollections] = session
    ? await Promise.all([getBookmarkedQuestionIds(), getUserCollections()])
    : [new Set<string>(), []]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Questions</h2>
        <p className="text-muted-foreground mt-1">
          Explore intersectional cybersecurity topics
        </p>
      </div>

      <QuizGrid
        questions={questions}
        bookmarkedIds={bookmarkedIds}
        userCollections={userCollections}
        isAuthenticated={!!session}
        onBookmarkToggle={toggleBookmark}
      />
    </div>
  )
}
