// Fichier ingredients.ts

import type { Ingredient } from "../@types/ingredient"

export const ingredients: Ingredient[] = [
  // Ratatouille Provençale (id: 1)
  { id: 1, recipeId: 1, name: "Aubergine", quantity: 2, unit: "" },
  { id: 2, recipeId: 1, name: "Courgette", quantity: 3, unit: "" },
  { id: 3, recipeId: 1, name: "Poivron", quantity: 2, unit: "" },
  { id: 4, recipeId: 1, name: "Tomate", quantity: 4, unit: "" },
  { id: 5, recipeId: 1, name: "Oignon", quantity: 1, unit: "" },
  { id: 6, recipeId: 1, name: "Gousse d'ail", quantity: 3, unit: "" },
  { id: 7, recipeId: 1, name: "Herbes de Provence", quantity: 1, unit: "" },
  { id: 8, recipeId: 1, name: "Huile d'olive", quantity: 1, unit: "" },

  // Risotto aux champignons (id: 2)
  { id: 9, recipeId: 2, name: "Riz arborio", quantity: 300, unit: "g" },
  { id: 10, recipeId: 2, name: "Champignons de Paris", quantity: 250, unit: "g" },
  { id: 11, recipeId: 2, name: "Oignon", quantity: 1, unit: "" },
  { id: 12, recipeId: 2, name: "Gousse d'ail", quantity: 2, unit: "" },
  { id: 13, recipeId: 2, name: "Vin blanc sec", quantity: 100, unit: "ml" },
  { id: 14, recipeId: 2, name: "Bouillon de légumes", quantity: 1, unit: "L" },
  { id: 15, recipeId: 2, name: "Parmesan râpé", quantity: 50, unit: "g" },
  { id: 16, recipeId: 2, name: "Beurre", quantity: 30, unit: "g" },

  // Tacos au poulet (id: 3)
  { id: 17, recipeId: 3, name: "Blanc de poulet", quantity: 500, unit: "g" },
  { id: 18, recipeId: 3, name: "Tortillas de maïs", quantity: 8, unit: "" },
  { id: 19, recipeId: 3, name: "Avocat", quantity: 1, unit: "" },
  { id: 20, recipeId: 3, name: "Tomate", quantity: 1, unit: "" },
  { id: 21, recipeId: 3, name: "Oignon rouge", quantity: 1, unit: "" },
  { id: 22, recipeId: 3, name: "Citron vert", quantity: 1, unit: "" },
  { id: 23, recipeId: 3, name: "Coriandre fraîche", quantity: 1, unit: "botte" },
  { id: 24, recipeId: 3, name: "Épices mexicaines", quantity: 1, unit: "c. à soupe" },

  // Salade César (id: 4)
  { id: 25, recipeId: 4, name: "Laitue romaine", quantity: 1, unit: "" },
  { id: 26, recipeId: 4, name: "Blanc de poulet", quantity: 200, unit: "g" },
  { id: 27, recipeId: 4, name: "Parmesan", quantity: 50, unit: "g" },
  { id: 28, recipeId: 4, name: "Pain", quantity: 2, unit: "tranches" },
  { id: 29, recipeId: 4, name: "Jaune d'œuf", quantity: 1, unit: "" },
  { id: 30, recipeId: 4, name: "Gousse d'ail", quantity: 1, unit: "" },
  { id: 31, recipeId: 4, name: "Anchois", quantity: 3, unit: "" },
  { id: 32, recipeId: 4, name: "Huile d'olive", quantity: 2, unit: "c. à soupe" },
  { id: 33, recipeId: 4, name: "Jus de citron", quantity: 1, unit: "c. à soupe" },

  // Pad Thaï (id: 5)
  { id: 34, recipeId: 5, name: "Nouilles de riz", quantity: 200, unit: "g" },
  { id: 35, recipeId: 5, name: "Crevettes", quantity: 300, unit: "g" },
  { id: 36, recipeId: 5, name: "Œufs", quantity: 2, unit: "" },
  { id: 37, recipeId: 5, name: "Germes de soja", quantity: 100, unit: "g" },
  { id: 38, recipeId: 5, name: "Gousse d'ail", quantity: 2, unit: "" },
  { id: 39, recipeId: 5, name: "Sauce de poisson", quantity: 2, unit: "c. à soupe" },
  { id: 40, recipeId: 5, name: "Sauce soja", quantity: 2, unit: "c. à soupe" },
  { id: 41, recipeId: 5, name: "Citron vert", quantity: 1, unit: "" },
  { id: 42, recipeId: 5, name: "Cacahuètes concassées", quantity: 30, unit: "g" },
  { id: 43, recipeId: 5, name: "Coriandre fraîche", quantity: 1, unit: "botte" },

  // Tiramisu (id: 6)
  { id: 44, recipeId: 6, name: "Mascarpone", quantity: 250, unit: "g" },
  { id: 45, recipeId: 6, name: "Œufs", quantity: 3, unit: "" },
  { id: 46, recipeId: 6, name: "Sucre", quantity: 100, unit: "g" },
  { id: 47, recipeId: 6, name: "Biscuits à la cuillère", quantity: 200, unit: "g" },
  { id: 48, recipeId: 6, name: "Café fort", quantity: 200, unit: "ml" },
  { id: 49, recipeId: 6, name: "Cacao en poudre", quantity: 1, unit: "c. à soupe" },
  { id: 50, recipeId: 6, name: "Amaretto", quantity: 2, unit: "c. à soupe" },

  // Soupe à l’oignon (id: 7)
  { id: 51, recipeId: 7, name: "Oignons", quantity: 6, unit: "" },
  { id: 52, recipeId: 7, name: "Beurre", quantity: 2, unit: "c. à soupe" },
  { id: 53, recipeId: 7, name: "Farine", quantity: 1, unit: "c. à soupe" },
  { id: 54, recipeId: 7, name: "Bouillon de bœuf", quantity: 1, unit: "L" },
  { id: 55, recipeId: 7, name: "Vin blanc sec", quantity: 100, unit: "ml" },
  { id: 56, recipeId: 7, name: "Pain", quantity: 4, unit: "tranches" },
  { id: 57, recipeId: 7, name: "Gruyère râpé", quantity: 150, unit: "g" },
  { id: 58, recipeId: 7, name: "Thym frais", quantity: 1, unit: "brin" },

  // Houmous (id: 8)
  { id: 59, recipeId: 8, name: "Pois chiches cuits", quantity: 400, unit: "g" },
  { id: 60, recipeId: 8, name: "Tahini", quantity: 2, unit: "c. à soupe" },
  { id: 61, recipeId: 8, name: "Gousses d'ail", quantity: 2, unit: "" },
  { id: 62, recipeId: 8, name: "Jus de citron", quantity: 1, unit: "" },
  { id: 63, recipeId: 8, name: "Huile d'olive", quantity: 4, unit: "c. à soupe" },
  { id: 64, recipeId: 8, name: "Cumin", quantity: 1, unit: "c. à café" },
  { id: 65, recipeId: 8, name: "Sel et poivre", quantity: 1, unit: "pincée" },
  { id: 66, recipeId: 8, name: "Paprika", quantity: 1, unit: "c. à café" },

  // Pancakes aux myrtilles (id: 9)
  { id: 67, recipeId: 9, name: "Farine", quantity: 200, unit: "g" },
  { id: 68, recipeId: 9, name: "Œufs", quantity: 2, unit: "" },
  { id: 69, recipeId: 9, name: "Sucre", quantity: 30, unit: "g" },
  { id: 70, recipeId: 9, name: "Lait", quantity: 300, unit: "ml" },
  { id: 71, recipeId: 9, name: "Levure chimique", quantity: 1, unit: "sachet" },
  { id: 72, recipeId: 9, name: "Myrtilles fraîches", quantity: 150, unit: "g" },
  { id: 73, recipeId: 9, name: "Beurre", quantity: 20, unit: "g" },
  { id: 74, recipeId: 9, name: "Sirop d'érable", quantity: 1, unit: "filet" },

  // Taboulé libanais (id: 10)
  { id: 75, recipeId: 10, name: "Persil plat", quantity: 200, unit: "g" },
  { id: 76, recipeId: 10, name: "Menthe fraîche", quantity: 100, unit: "g" },
  { id: 77, recipeId: 10, name: "Boulgour fin", quantity: 100, unit: "g" },
  { id: 78, recipeId: 10, name: "Tomates", quantity: 4, unit: "" },
  { id: 79, recipeId: 10, name: "Concombre", quantity: 1, unit: "" },
  { id: 80, recipeId: 10, name: "Oignons nouveaux", quantity: 4, unit: "" },
  { id: 81, recipeId: 10, name: "Jus de citron", quantity: 2, unit: "" },
  { id: 82, recipeId: 10, name: "Huile d'olive", quantity: 6, unit: "c. à soupe" },
  { id: 83, recipeId: 10, name: "Sel et poivre", quantity: 1, unit: "pincée" },
];
