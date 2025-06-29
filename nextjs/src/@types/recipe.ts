import type { Ingredient } from "./ingredient"

export interface Recipe {
    id: number
    name: string
    description: string
    image: string
    cookingTime: number
    difficulty: string
    portions: number
    mealType: string
    cuisineType: string
    dietaryRestrictions: string[]
    ingredients: Ingredient[]
    instructions: string[]
}