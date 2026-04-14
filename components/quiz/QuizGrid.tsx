"use client"

import { useState } from "react"
import { toast } from "sonner"
import QuizCard from "./QuizCard"
import type { QuestionWithCategory, Collection } from "@/types"

interface QuizGridProps {
  questions: QuestionWithCategory[]
  bookmarkedIds: Set<string>
  userCollections: Collection[]
  isAuthenticated: boolean
  onBookmarkToggle?: (questionId: string) => void
  onAddToCollectionClick?: (questionId: string) => void
}

export default function QuizGrid({
  questions,
  bookmarkedIds,
  userCollections,
  isAuthenticated,
  onBookmarkToggle,
  onAddToCollectionClick,
}: QuizGridProps) {
  const [optimisticBookmarks, setOptimisticBookmarks] = useState<Set<string>>(
    new Set(bookmarkedIds)
  )

  function handleBookmarkToggle(questionId: string) {
    if (!isAuthenticated) {
      toast("Sign in to save bookmarks", {
        description: "Create a free account to save your progress.",
        action: {
          label: "Sign in",
          onClick: () => { window.location.href = "/auth/login" },
        },
      })
      return
    }

    setOptimisticBookmarks((previous) => {
      const next = new Set(previous)
      if (next.has(questionId)) {
        next.delete(questionId)
      } else {
        next.add(questionId)
      }
      return next
    })

    onBookmarkToggle?.(questionId)
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium">No questions found</p>
        <p className="text-sm mt-1">Try selecting a different category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
        <QuizCard
          key={question.id}
          question={question}
          isBookmarked={optimisticBookmarks.has(question.id)}
          userCollections={userCollections}
          isAuthenticated={isAuthenticated}
          onBookmarkToggle={handleBookmarkToggle}
          onAddToCollectionClick={onAddToCollectionClick}
        />
      ))}
    </div>
  )
}
