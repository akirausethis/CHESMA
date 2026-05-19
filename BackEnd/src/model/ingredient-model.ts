export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}


export function toIngredientResponse(ingredient: Ingredient): IngredientResponse{
    return{
        name        : ingredient.name,
        quantity    : ingredient.quantity,
        unit        : ingredient.unit,
    };
}

export function toIngredientResponseList(ingredients: Ingredient[]): IngredientResponse[] {
    const result = ingredients.map((ingredient) => {
      return {
        name        : ingredient.name,
        quantity    : ingredient.quantity,
        unit        : ingredient.unit,
      };
    })

    return result
}

export interface CreateIngredientRequest{
    name        : string
    quantity    : number
    unit        : string
}


export interface UpdateIngredientRequest{
    id          : number
    name        : string
    quantity    : number
    unit        : string
}

export interface IngredientResponse{
    name        : string
    quantity    : number
    unit        : string
}
