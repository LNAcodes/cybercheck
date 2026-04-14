import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { getUserCollections } from "@/actions/collections"
import CreateCollectionDialog from "@/components/collections/CreateCollectionDialog"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default async function CollectionsPage() {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const collections = await getUserCollections()

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Collections</h2>
          <p className="text-muted-foreground mt-1">
            {collections.length === 0
              ? "Create a collection to start organising questions."
              : `${collections.length} collection${collections.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <CreateCollectionDialog />
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" aria-hidden="true" />
          <p className="text-lg font-medium">No collections yet</p>
          <p className="text-sm mt-1">Use the + button on any question card to add it to a collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-5 flex flex-col gap-2">
                  <p className="font-semibold text-base leading-snug">{collection.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {collection.itemCount === 0
                      ? "No questions"
                      : `${collection.itemCount} question${collection.itemCount === 1 ? "" : "s"}`}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
