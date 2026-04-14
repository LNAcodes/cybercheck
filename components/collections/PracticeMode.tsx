"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizCard from "@/components/quiz/QuizCard"
import type { QuestionWithCategory } from "@/types"

interface PracticeModeProps {
  questions: QuestionWithCategory[]
}

export default function PracticeMode({ questions }: PracticeModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">No questions in this collection yet</p>
        <p className="text-sm mt-1">Add questions from the home page or your bookmarks.</p>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentIndex((index) => index - 1)}
          disabled={currentIndex === 0}
          aria-label="Previous question"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>

        <span className="text-sm text-muted-foreground font-medium">
          {currentIndex + 1} of {questions.length}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentIndex((index) => index + 1)}
          disabled={currentIndex === questions.length - 1}
          aria-label="Next question"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          isBookmarked={false}
          userCollections={[]}
          isAuthenticated={true}
          onBookmarkToggle={() => {}}
        />
      </div>
    </div>
  )
}
