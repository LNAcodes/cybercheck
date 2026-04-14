import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getBookmarkedQuestions, toggleBookmark } from "@/actions/bookmarks"
import { getUserCollections } from "@/actions/collections"
import QuizGrid from "@/components/quiz/QuizGrid"

export default async function BookmarksPage() {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const [questions, userCollections] = await Promise.all([
    getBookmarkedQuestions(),
    getUserCollections(),
  ])
  const bookmarkedIds = new Set(questions.map((question) => question.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Bookmarks</h2>
        <p className="text-muted-foreground mt-1">
          {questions.length === 0
            ? "No bookmarks yet. Start bookmarking questions from the home page."
            : `${questions.length} saved question${questions.length === 1 ? "" : "s"}`}
        </p>
      </div>

      <QuizGrid
        questions={questions}
        bookmarkedIds={bookmarkedIds}
        userCollections={userCollections}
        isAuthenticated={true}
        onBookmarkToggle={toggleBookmark}
      />
    </div>
  )
}
