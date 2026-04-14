"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { addToCollection, createCollection } from "@/actions/collections"
import type { Collection } from "@/types"

interface AddToCollectionDialogProps {
  questionId: string | null
  userCollections: Collection[]
  onClose: () => void
  onCollectionCreated: (collection: Collection) => void
}

export default function AddToCollectionDialog({
  questionId,
  userCollections,
  onClose,
  onCollectionCreated,
}: AddToCollectionDialogProps) {
  const [newCollectionName, setNewCollectionName] = useState("")
  const [showNewInput, setShowNewInput] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [addingToId, setAddingToId] = useState<string | null>(null)
  const [justAddedId, setJustAddedId] = useState<string | null>(null)

  function handleOpenChange(open: boolean) {
    if (!open) {
      setShowNewInput(false)
      setNewCollectionName("")
      onClose()
    }
  }

  async function handleAddToCollection(collectionId: string) {
    if (!questionId) return
    setAddingToId(collectionId)

    const result = await addToCollection(collectionId, questionId)
    setAddingToId(null)

    if (result.error) {
      toast.error(result.error)
      return
    }

    setJustAddedId(collectionId)
    toast.success("Added to collection")
    setTimeout(() => {
      setJustAddedId(null)
      onClose()
    }, 700)
  }

  async function handleCreateAndAdd(event: React.FormEvent) {
    event.preventDefault()
    if (!questionId || !newCollectionName.trim()) return
    setIsCreating(true)

    const created = await createCollection(newCollectionName)
    if (created.error) {
      toast.error(created.error)
      setIsCreating(false)
      return
    }

    const newCollection: Collection = {
      id: created.id!,
      name: newCollectionName.trim(),
      userId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    onCollectionCreated(newCollection)

    const added = await addToCollection(created.id!, questionId)
    setIsCreating(false)

    if (added.error) {
      toast.error(added.error)
      return
    }

    toast.success(`Added to "${newCollectionName.trim()}"`)
    setNewCollectionName("")
    setShowNewInput(false)
    onClose()
  }

  return (
    <Dialog open={questionId !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          {userCollections.length === 0 && !showNewInput && (
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any collections yet.
            </p>
          )}

          {userCollections.map((collection) => (
            <Button
              key={collection.id}
              variant="outline"
              className="justify-between"
              disabled={addingToId === collection.id || justAddedId === collection.id}
              onClick={() => handleAddToCollection(collection.id)}
            >
              {collection.name}
              {justAddedId === collection.id && (
                <Check className="h-4 w-4 text-success" aria-hidden="true" />
              )}
            </Button>
          ))}

          {showNewInput ? (
            <form onSubmit={handleCreateAndAdd} className="flex gap-2 mt-1">
              <Input
                value={newCollectionName}
                onChange={(event) => setNewCollectionName(event.target.value)}
                placeholder="Collection name"
                maxLength={50}
                autoFocus
              />
              <Button type="submit" disabled={isCreating || !newCollectionName.trim()}>
                {isCreating ? "Creating..." : "Create & Add"}
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              className="justify-start text-muted-foreground gap-2"
              onClick={() => setShowNewInput(true)}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New collection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
