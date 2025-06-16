import { Recipe } from "@/@types/recipe";

const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: "Ratatouille Provençale",
      description: "Un plat traditionnel du sud de la France, parfait pour l'été avec des légumes frais.",
      image: "https://placehold.co/600x400.svg",
      cookingTime: 60,
      difficulty: "Moyen",
      portions: 4,
      cuisineType: "Française",
      dietaryRestrictions: ["Végétarien", "Végétalien", "Sans gluten"],
    },
    {
      id: 2,
      name: "Risotto aux champignons",
      description: "Un risotto crémeux aux champignons parfumé au parmesan et au vin blanc.",
      image: "https://placehold.co/600x400.svg",
      cookingTime: 40,
      difficulty: "Moyen",
      portions: 4,
      cuisineType: "Italienne",
      dietaryRestrictions: ["Végétarien"],
    },
    {
      id: 3,
      name: "Tacos au poulet",
      description: "Des tacos mexicains authentiques avec du poulet mariné et des garnitures fraîches.",
      image: "https://placehold.co/600x400.svg",
      cookingTime: 30,
      difficulty: "Facile",
      portions: 4,
      cuisineType: "Mexicaine",
      dietaryRestrictions: [],
    },
];

export default mockRecipes;