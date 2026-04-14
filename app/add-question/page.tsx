import { getCategories } from "@/actions/questions"
import QuestionSubmitForm from "@/components/forms/QuestionSubmitForm"

export default async function AddQuestionPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold">Submit a Question</h2>
      <p className="text-muted-foreground mt-1 mb-6">
        Propose a new question for review. Approved questions will appear on the site.
      </p>
      <QuestionSubmitForm categories={categories} />
    </div>
  )
}
