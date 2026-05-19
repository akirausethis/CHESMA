import { MealIngredient } from './menu-model';

export interface MenuIngredient {
  name: string;
  measure?: string | null;
  index?: number;
}

export function fromMealIngredient(mi: MealIngredient): MenuIngredient {
  return { name: mi.name, measure: mi.measure ?? null, index: mi.index };
}

export function fromMealIngredients(list: MealIngredient[] = []): MenuIngredient[] {
  return list.map(fromMealIngredient);
}

export default MenuIngredient;
