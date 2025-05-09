import Image from "next/image"
import { Clock, ChefHat, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "../../@types/recipe"
import LikeButton from "@/components/molecules/LikeButton"

interface RecipeCardProps {
    recipe: Recipe
    onClick: () => void
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
    return (
        <Card
            className="
                overflow-hidden group px-2
                hover:cursor-pointer hover:shadow-sm hover:scale-101
                transition-all duration-300
            "
            data-slot="card"
            onClick={onClick}
        >
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="rounded-xs object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{recipe.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.cookingTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        <span>{recipe.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{recipe.servings} pers.</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-4 pt-0 flex justify-between items-center">
                <div className="flex flex-wrap gap-2 justify-start items-center">
                    <Badge variant="secondary" className="text-xs">
                        {recipe.cuisineType}
                    </Badge>
                </div>

                <LikeButton />

            </CardFooter>
        </Card>
    )
}
