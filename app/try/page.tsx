import { auth } from "@/lib/auth"
import { getApprovedQuestions } from "@/actions/questions"
import GuestBanner from "@/components/auth/GuestBanner"
import QuizGrid from "@/components/quiz/QuizGrid"

export default async function TryPage() {
  const [session, questions] = await Promise.all([auth(), getApprovedQuestions()])

  return (
    <div>
      {!session && <GuestBanner />}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Try CyberCheck</h2>
          <p className="text-muted-foreground mt-1">
            Explore intersectional cybersecurity topics
          </p>
        </div>
        <QuizGrid
          questions={questions}
          bookmarkedIds={new Set()}
          userCollections={[]}
          isAuthenticated={!!session}
        />
      </div>
    </div>
  )
}
