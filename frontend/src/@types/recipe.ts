export interface Recipe {
    id: number
    name: string
    description: string
    image: string
    cookingTime: number
    difficulty: string
    servings: number
    mealType: string
    cuisineType: string
    dietaryRestrictions: string[]
    ingredients: string[]
    instructions: string[]
  }