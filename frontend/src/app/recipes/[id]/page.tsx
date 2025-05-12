import { recipes } from "@/data/recipes" // ou récupère depuis une API/DB
import { notFound } from "next/navigation"
import { Navbar } from "@/components/molecules/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import IngredientsTable from "@/components/organisms/IngredientsTable"
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
                <header className="w-full flex flex-row items-center justify-between bg-accent">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div className="flex flex-col items-end justify-center text-right">
                        <h1 className="text-3xl font-bold">{recipe.name}</h1>
                        <p className="mb-2">{recipe.description}</p>
                    </div>
                </header>
                <div className="w-full flex flex-row items-center justify-between">
                    <section className="w-full flex flex-row items-center justify-between  flex-2">
                        <IngredientsTable ingredients={recipe.ingredients} />
                    </section>
                    <section className="w-full flex flex-row items-center justify-between flex-3">
                        <div className="">
                            <p>{recipe.description}</p>
                        </div>
                    </section>
                </div>

            </article>
        </div>
    )
}