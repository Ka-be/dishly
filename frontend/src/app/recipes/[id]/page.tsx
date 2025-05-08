import { recipes } from "@/data/recipes" // ou récupère depuis une API/DB
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
interface RecipeDetailPageProps {
    params: { id: string }
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
    const recipe = recipes.find(r => r.id === Number(params.id))

    if (!recipe) return notFound()

    return (


        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-outfit)]">
            <Navbar />

            <article className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
                <Link href="/">
                    <Button variant="outline" className="mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                    </Button>
                </Link>

                <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
                <img src={recipe.image} alt={recipe.name} className="rounded-lg mb-4" />
                <p className="mb-2">{recipe.description}</p>
            </article>
        </div>
    )
}