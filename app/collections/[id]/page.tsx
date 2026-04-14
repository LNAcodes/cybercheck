import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { getCollectionWithQuestions } from "@/actions/collections"
import PracticeMode from "@/components/collections/PracticeMode"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface CollectionPageProps {
  params: { id: string }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const data = await getCollectionWithQuestions(params.id)
  if (!data) notFound()

  const { collection, questions } = data

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-3 text-muted-foreground">
          <Link href="/collections">
            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Collections
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">{collection.name}</h2>
        <p className="text-muted-foreground mt-1">
          {questions.length === 0
            ? "No questions yet"
            : `${questions.length} question${questions.length === 1 ? "" : "s"}`}
        </p>
      </div>

      <PracticeMode questions={questions} />
    </div>
  )
}
