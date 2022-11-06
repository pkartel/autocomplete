export enum AlcoholContainment {
    nonAlcoholic = 'Non alcoholic',
    alcoholic = 'Alcoholic'
  }

  export enum Ingredient {
    base = 'strIngredient'
  }
  
export interface IDrink {
    idDrink: string;
    strAlcoholic: AlcoholContainment;
    strCategory: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
}
  
export interface ISuggestion {
    id: string;
    name: string;
    ingredients: string[];
    recipe: string;
    image: string;
}