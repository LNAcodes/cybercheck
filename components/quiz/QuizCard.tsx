"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Check, X, Plus } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { QuestionWithCategory, OptionLetter, Collection } from "@/types"

interface QuizCardProps {
  question: QuestionWithCategory
  isBookmarked: boolean
  userCollections: Collection[]
  isAuthenticated: boolean
  onBookmarkToggle: (questionId: string) => void
  onAddToCollectionClick?: (questionId: string) => void
}

const DIFFICULTY_STYLES: Record<string, string> = {
  BEGINNER: "bg-success/20 text-success dark:bg-success/10",
  INTERMEDIATE: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  ADVANCED: "bg-warning/20 text-warning",
}

const DIFFICULTY_LABELS: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
}

const OPTIONS: OptionLetter[] = ["A", "B", "C"]

function getOptionText(question: QuestionWithCategory, option: OptionLetter): string {
  if (option === "A") return question.optionA
  if (option === "B") return question.optionB
  return question.optionC
}

function getOptionStyle(
  option: OptionLetter,
  selectedOption: OptionLetter | null,
  correctOption: OptionLetter,
  isRevealed: boolean
): string {
  if (!isRevealed) return "border-border hover:bg-muted/50"

  if (option === correctOption) {
    return "border-success bg-success-bg dark:border-success"
  }
  if (option === selectedOption && option !== correctOption) {
    return "border-warning bg-warning-bg dark:border-warning"
  }
  return "border-border opacity-60"
}

export default function QuizCard({
  question,
  isBookmarked,
  isAuthenticated,
  onBookmarkToggle,
  onAddToCollectionClick,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<OptionLetter | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  function handleReveal() {
    setIsRevealed(true)
  }

  function handleTryAgain() {
    setSelectedOption(null)
    setIsRevealed(false)
  }

  function handleBookmarkClick() {
    onBookmarkToggle(question.id)
  }

  return (
    <Card className="relative flex flex-col gap-4 p-4 rounded-xl shadow-sm">
      {/* Top row: difficulty + bookmark */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className={cn("text-xs font-medium", DIFFICULTY_STYLES[question.difficulty])}
          >
            {DIFFICULTY_LABELS[question.difficulty]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.category.name}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
          aria-pressed={isBookmarked}
          className={cn(
            "h-8 w-8 shrink-0 transition-colors",
            isBookmarked
              ? "text-accent hover:text-accent/80"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Question */}
      <CardContent className="p-0">
        <fieldset>
          <legend className="text-base font-semibold text-foreground mb-3 leading-snug">
            {question.questionText}
          </legend>

          <RadioGroup
            value={selectedOption ?? ""}
            onValueChange={(value) => {
              if (!isRevealed) setSelectedOption(value as OptionLetter)
            }}
            aria-label="Answer options"
            className="flex flex-col gap-2"
          >
            {OPTIONS.map((option) => {
              const optionText = getOptionText(question, option)
              const optionStyle = getOptionStyle(
                option,
                selectedOption,
                question.correctOption,
                isRevealed
              )
              const isCorrect = isRevealed && option === question.correctOption
              const isWrong =
                isRevealed && option === selectedOption && option !== question.correctOption

              return (
                <Label
                  key={option}
                  htmlFor={`${question.id}-option-${option}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    optionStyle,
                    isRevealed && "cursor-default"
                  )}
                >
                  <RadioGroupItem
                    value={option}
                    id={`${question.id}-option-${option}`}
                    disabled={isRevealed}
                    aria-label={`Option ${option}: ${optionText}`}
                    className="shrink-0"
                  />
                  <span className="flex-1 text-sm">{optionText}</span>
                  {isCorrect && (
                    <Check
                      className="h-4 w-4 shrink-0 text-success"
                      aria-label="Correct answer"
                    />
                  )}
                  {isWrong && (
                    <X
                      className="h-4 w-4 shrink-0 text-warning"
                      aria-label="Incorrect answer"
                    />
                  )}
                </Label>
              )
            })}
          </RadioGroup>
        </fieldset>

        {/* Explanation shown after reveal */}
        {isRevealed && question.explanation && (
          <p className="mt-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            {question.explanation}
          </p>
        )}
      </CardContent>

      {/* Footer actions */}
      <CardFooter className="p-0 flex flex-wrap gap-2">
        {!isRevealed ? (
          <Button
            onClick={handleReveal}
            disabled={selectedOption === null}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Show Answer
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleTryAgain}
            className="flex-1"
          >
            Try Again
          </Button>
        )}

        {isAuthenticated && onAddToCollectionClick && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onAddToCollectionClick(question.id)}
            aria-label="Add to collection"
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
