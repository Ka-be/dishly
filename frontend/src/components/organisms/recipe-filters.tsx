"use client"

import type React from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

type Filters = {
    mealType: string[]
    cuisineType: string[]
    dietaryRestrictions: string[]
    maxTime: number
    difficulty: string[]
}

interface RecipeFiltersProps {
    activeFilters: Filters
    setActiveFilters: React.Dispatch<React.SetStateAction<Filters>>
    toggleFilter: (filterType: Exclude<keyof Filters, "maxTime">, value: string) => void
    clearFilters: () => void
}

export function RecipeFilters({ activeFilters, setActiveFilters, toggleFilter, clearFilters }: RecipeFiltersProps) {
    const mealTypes = ["Petit-déjeuner", "Déjeuner", "Dîner", "Dessert", "Snack", "Apéritif"]
    const cuisineTypes = ["Française", "Italienne", "Mexicaine", "Asiatique", "Méditerranéenne", "Américaine"]
    const dietaryRestrictions = ["Végétarien", "Végétalien", "Sans gluten", "Sans lactose", "Faible en calories"]
    const difficultyLevels = ["Facile", "Moyen", "Difficile"]

    return (
        <div className="mt-2 p-6 bg-white border rounded-sm shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filtres</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Effacer tout
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <h4 className="font-medium mb-2">Type de repas</h4>
                    <div className="space-y-2">
                        {mealTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`meal-${type}`}
                                    checked={activeFilters.mealType.includes(type)}
                                    onCheckedChange={() => toggleFilter("mealType", type)}
                                />
                                <label
                                    htmlFor={`meal-${type}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Cuisine</h4>
                    <div className="space-y-2">
                        {cuisineTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cuisine-${type}`}
                                    checked={activeFilters.cuisineType.includes(type)}
                                    onCheckedChange={() => toggleFilter("cuisineType", type)}
                                />
                                <label
                                    htmlFor={`cuisine-${type}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Restrictions alimentaires</h4>
                    <div className="space-y-2">
                        {dietaryRestrictions.map((restriction) => (
                            <div key={restriction} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`diet-${restriction}`}
                                    checked={activeFilters.dietaryRestrictions.includes(restriction)}
                                    onCheckedChange={() => toggleFilter("dietaryRestrictions", restriction)}
                                />
                                <label
                                    htmlFor={`diet-${restriction}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {restriction}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium mb-2">Temps de préparation</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Max {activeFilters.maxTime} minutes</span>
                            </div>
                            <Slider
                                value={[activeFilters.maxTime]}
                                min={10}
                                max={120}
                                step={5}
                                onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, maxTime: value[0] }))}
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>10 min</span>
                                <span>2h</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Niveau de difficulté</h4>
                        <div className="space-y-2">
                            {difficultyLevels.map((level) => (
                                <div key={level} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`difficulty-${level}`}
                                        checked={activeFilters.difficulty.includes(level)}
                                        onCheckedChange={() => toggleFilter("difficulty", level)}
                                    />
                                    <label
                                        htmlFor={`difficulty-${level}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {level}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
