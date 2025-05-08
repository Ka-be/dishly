"use client"

import { useState } from "react"
import { Search, Sliders, Utensils, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeFilters } from "@/components/recipe-filters"
import { recipes } from "@/data/recipes"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
type Filters = {
    mealType: string[]
    cuisineType: string[]
    dietaryRestrictions: string[]
    maxTime: number
    difficulty: string[]
}

export function RecipeSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [activeFilters, setActiveFilters] = useState<{
        mealType: string[]
        cuisineType: string[]
        dietaryRestrictions: string[]
        maxTime: number
        difficulty: string[]
    }>({
        mealType: [],
        cuisineType: [],
        dietaryRestrictions: [],
        maxTime: 120,
        difficulty: [],
    })

    // Filter recipes based on search query and active filters
    const filteredRecipes = recipes.filter((recipe) => {
        // Search query filter
        if (
            searchQuery &&
            !recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false
        }

        // Meal type filter
        if (activeFilters.mealType.length > 0 && !activeFilters.mealType.includes(recipe.mealType)) {
            return false
        }

        // Cuisine type filter
        if (activeFilters.cuisineType.length > 0 && !activeFilters.cuisineType.includes(recipe.cuisineType)) {
            return false
        }

        // Dietary restrictions filter
        if (
            activeFilters.dietaryRestrictions.length > 0 &&
            !activeFilters.dietaryRestrictions.every((restriction) => recipe.dietaryRestrictions.includes(restriction))
        ) {
            return false
        }

        // Cooking time filter
        if (recipe.cookingTime > activeFilters.maxTime) {
            return false
        }

        // Difficulty filter
        if (activeFilters.difficulty.length > 0 && !activeFilters.difficulty.includes(recipe.difficulty)) {
            return false
        }

        return true
    })

    const toggleFilter = (
        filterType: Exclude<keyof Filters, "maxTime">,
        value: string
    ) => {
        setActiveFilters((prev) => {
            const currentFilters = prev[filterType] as string[]

            if (currentFilters.includes(value)) {
                return {
                    ...prev,
                    [filterType]: currentFilters.filter((item) => item !== value),
                }
            } else {
                return {
                    ...prev,
                    [filterType]: [...currentFilters, value],
                }
            }
        })
    }

    const clearFilters = () => {
        setActiveFilters({
            mealType: [],
            cuisineType: [],
            dietaryRestrictions: [],
            maxTime: 120,
            difficulty: [],
        })
        setSearchQuery("")
    }

    const totalActiveFilters =
        activeFilters.mealType.length +
        activeFilters.cuisineType.length +
        activeFilters.dietaryRestrictions.length +
        activeFilters.difficulty.length +
        (activeFilters.maxTime < 120 ? 1 : 0)

    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            <div className="relative">
                <div className="flex items-center border rounded-sm shadow-sm overflow-hidden bg-white">
                    <div className="flex-1 flex items-center pl-4">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <Input
                            type="text"
                            placeholder="Rechercher une recette..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-s-sm rounded-e-none relative"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Sliders className="h-5 w-5" />
                        {totalActiveFilters > 0 && (
                            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {totalActiveFilters}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {showFilters && (
                <RecipeFilters
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                    toggleFilter={toggleFilter}
                    clearFilters={clearFilters}
                />
            )}

            {(activeFilters.mealType.length > 0 ||
                activeFilters.cuisineType.length > 0 ||
                activeFilters.dietaryRestrictions.length > 0 ||
                activeFilters.difficulty.length > 0 ||
                activeFilters.maxTime < 120) && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {activeFilters.mealType.map((type) => (
                            <Badge key={type} variant="secondary" className="px-3 py-1">
                                {type}
                                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => toggleFilter("mealType", type)} />
                            </Badge>
                        ))}
                        {activeFilters.cuisineType.map((type) => (
                            <Badge key={type} variant="secondary" className="px-3 py-1">
                                {type}
                                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => toggleFilter("cuisineType", type)} />
                            </Badge>
                        ))}
                        {activeFilters.dietaryRestrictions.map((restriction) => (
                            <Badge key={restriction} variant="secondary" className="px-3 py-1">
                                {restriction}
                                <X
                                    className="h-3 w-3 ml-2 cursor-pointer"
                                    onClick={() => toggleFilter("dietaryRestrictions", restriction)}
                                />
                            </Badge>
                        ))}
                        {activeFilters.difficulty.map((level) => (
                            <Badge key={level} variant="secondary" className="px-3 py-1">
                                {level}
                                <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => toggleFilter("difficulty", level)} />
                            </Badge>
                        ))}
                        {activeFilters.maxTime < 120 && (
                            <Badge variant="secondary" className="px-3 py-1">
                                Max {activeFilters.maxTime} min
                                <X
                                    className="h-3 w-3 ml-2 cursor-pointer"
                                    onClick={() => setActiveFilters((prev) => ({ ...prev, maxTime: 120 }))}
                                />
                            </Badge>
                        )}
                        {totalActiveFilters > 0 && (
                            <Button variant="ghost" size="sm" className="text-sm h-8" onClick={clearFilters}>
                                Effacer tous les filtres
                            </Button>
                        )}
                    </div>
                )}

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {filteredRecipes.length} {filteredRecipes.length === 1 ? "recette trouvée" : "recettes trouvées"}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Trier par:</span>
                        <select className="text-sm border rounded-sm px-2 py-1">
                            <option>Popularité</option>
                            <option>Temps de préparation</option>
                            <option>Difficulté</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                            <RecipeCard recipe={recipe} />
                        </Link>
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <Utensils className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Aucune recette trouvée</h3>
                        <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                        <Button onClick={clearFilters}>Effacer les filtres</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
