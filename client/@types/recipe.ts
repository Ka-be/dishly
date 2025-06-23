export interface Recipe {
	id: number;
	name: string;
	description: string;
	image: string;
	cookingTime: number;
	difficulty: string;
	portions: number;
	cuisineType: string;
	dietaryRestrictions: string[];
	likesCount: number;
}
