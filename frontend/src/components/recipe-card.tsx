import Image from "next/image"
import { Clock, ChefHat, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "../@types/recipe"

interface RecipeCardProps {
    recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Card className="
        overflow-hidden group px-2
        hover:cursor-pointer hover:shadow-lg
        transition-all duration-300">
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-sm h-8 w-8"
                >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Ajouter aux favoris</span>
                </Button>
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
                    <Badge variant="outline" className="text-xs">
                        {recipe.cuisineType}
                    </Badge>
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
            {/* <CardFooter className="p-4 pt-0">
                <Button variant="default" className="w-full">
                    Modifier la recette
                </Button>
            </CardFooter> */}
        </Card>
    )
}
