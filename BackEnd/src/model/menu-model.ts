export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb?: string | null;
}

export interface RawMealDetail {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
  // strIngredient1..20 and strMeasure1..20 may exist as string or null/empty
  [key: string]: any;
}

export interface MealIngredient {
  name: string;
  measure?: string | null;
  index?: number;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory?: string | null;
  strArea?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
  ingredients: MealIngredient[];
}

/**
 * Parse a RawMealDetail returned by TheMealDB (fields strIngredient1..20 and strMeasure1..20)
 * into a MealDetail with an `ingredients` array.
 */
export function parseMealDetail(raw: RawMealDetail): MealDetail {
  const ingredients: MealIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const name = raw[ingKey];
    const measure = raw[measureKey];
    if (name && typeof name === 'string' && name.trim() !== '') {
      ingredients.push({ name: name.trim(), measure: measure ? String(measure).trim() : null, index: i });
    }
  }

  return {
    idMeal: raw.idMeal,
    strMeal: raw.strMeal,
    strMealAlternate: raw.strMealAlternate ?? null,
    strCategory: raw.strCategory ?? null,
    strArea: raw.strArea ?? null,
    strInstructions: raw.strInstructions ?? null,
    strMealThumb: raw.strMealThumb ?? null,
    strTags: raw.strTags ?? null,
    strYoutube: raw.strYoutube ?? null,
    strSource: raw.strSource ?? null,
    strImageSource: raw.strImageSource ?? null,
    strCreativeCommonsConfirmed: raw.strCreativeCommonsConfirmed ?? null,
    dateModified: raw.dateModified ?? null,
    ingredients,
  };
}

export interface GetMealRequest{
    ingredients: string[];
}

export default MealDetail;
