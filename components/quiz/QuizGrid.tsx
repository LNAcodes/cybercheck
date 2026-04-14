"use client"

import { useState } from "react"
import { toast } from "sonner"
import QuizCard from "./QuizCard"
import AddToCollectionDialog from "@/components/collections/AddToCollectionDialog"
import type { QuestionWithCategory, Collection } from "@/types"

interface QuizGridProps {
  questions: QuestionWithCategory[]
  bookmarkedIds: Set<string>
  userCollections: Collection[]
  isAuthenticated: boolean
  onBookmarkToggle?: (questionId: string) => Promise<{ bookmarked: boolean; error?: string }>
}

export default function QuizGrid({
  questions,
  bookmarkedIds,
  userCollections,
  isAuthenticated,
  onBookmarkToggle,
}: QuizGridProps) {
  const [optimisticBookmarks, setOptimisticBookmarks] = useState<Set<string>>(
    new Set(bookmarkedIds)
  )
  const [localCollections, setLocalCollections] = useState<Collection[]>(userCollections)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  async function handleBookmarkToggle(questionId: string) {
    const wasBookmarked = optimisticBookmarks.has(questionId)

    setOptimisticBookmarks((previous) => {
      const next = new Set(previous)
      if (next.has(questionId)) {
        next.delete(questionId)
      } else {
        next.add(questionId)
      }
      return next
    })

    const result = await onBookmarkToggle?.(questionId)

    if (result?.error) {
      setOptimisticBookmarks((previous) => {
        const next = new Set(previous)
        if (wasBookmarked) {
          next.add(questionId)
        } else {
          next.delete(questionId)
        }
        return next
      })
      toast.error("Failed to update bookmark. Please try again.")
    }
  }

  function handleAddToCollectionClick(questionId: string) {
    setActiveQuestionId(questionId)
  }

  function handleCollectionCreated(collection: Collection) {
    setLocalCollections((previous) => [...previous, collection])
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <QuizCard
            key={question.id}
            question={question}
            isBookmarked={optimisticBookmarks.has(question.id)}
            userCollections={localCollections}
            isAuthenticated={isAuthenticated}
            onBookmarkToggle={handleBookmarkToggle}
            onAddToCollectionClick={handleAddToCollectionClick}
          />
        ))}
      </div>

      <AddToCollectionDialog
        questionId={activeQuestionId}
        userCollections={localCollections}
        onClose={() => setActiveQuestionId(null)}
        onCollectionCreated={handleCollectionCreated}
      />
    </>
  )
}
