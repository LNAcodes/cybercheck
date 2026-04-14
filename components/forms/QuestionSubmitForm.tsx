"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { submitQuestion } from "@/actions/submissions"
import type { Category } from "@/types"

const submitSchema = z.object({
  questionText: z.string().min(10, "Question must be at least 10 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  correctOption: z.enum(["A", "B", "C"]),
  explanation: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  categoryId: z.string().min(1, "Category is required"),
})

type SubmitValues = z.infer<typeof submitSchema>

interface QuestionSubmitFormProps {
  categories: Category[]
}

export default function QuestionSubmitForm({ categories }: QuestionSubmitFormProps) {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<SubmitValues>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      correctOption: "A",
      explanation: "",
      difficulty: "BEGINNER",
      categoryId: "",
    },
  })

  async function onSubmit(values: SubmitValues) {
    setIsPending(true)
    setServerError(null)

    const result = await submitQuestion(values)

    if (result.success) {
      setSuccess(true)
      form.reset()
    } else if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof SubmitValues, { message })
      })
    } else {
      setServerError(result.error ?? "Something went wrong")
    }

    setIsPending(false)
  }

  if (success) {
    return (
      <div className="rounded-lg border border-[--color-success] bg-[--color-success]/10 px-4 py-6 text-center">
        <p className="font-semibold text-[--color-success]">Question submitted!</p>
        <p className="text-sm text-muted-foreground mt-1">
          It&apos;s under review and will appear once approved.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSuccess(false)}
        >
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {serverError}
          </div>
        )}

        <FormField
          control={form.control}
          name="questionText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your question here…"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["A", "B", "C"] as const).map((letter) => (
            <FormField
              key={letter}
              control={form.control}
              name={`option${letter}` as "optionA" | "optionB" | "optionC"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option {letter}</FormLabel>
                  <FormControl>
                    <Input placeholder={`Option ${letter}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="correctOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  {(["A", "B", "C"] as const).map((letter) => (
                    <div key={letter} className="flex items-center gap-2">
                      <RadioGroupItem value={letter} id={`correct-${letter}`} />
                      <Label htmlFor={`correct-${letter}`}>Option {letter}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain why the correct answer is right…"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting…" : "Submit Question"}
        </Button>
      </form>
    </Form>
  )
}
