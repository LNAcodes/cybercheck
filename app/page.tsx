import { getApprovedQuestions } from "@/actions/questions"
import QuizGrid from "@/components/quiz/QuizGrid"

export default async function HomePage() {
  const questions = await getApprovedQuestions()

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
        bookmarkedIds={new Set()}
        userCollections={[]}
        isAuthenticated={false}
      />
    </div>
  )
}
