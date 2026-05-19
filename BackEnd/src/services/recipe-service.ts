import { prismaClient } from "../application/database";
import { CreateIngredientRequest, IngredientResponse, UpdateIngredientRequest } from "../model/ingredient-model";
import { logger } from "../application/logging";
import axios from "axios";
import { GetMealRequest } from "../model/menu-model";

export class RecipeService {
    static async getAllRecipes(uid: number): Promise<IngredientResponse[]> {
        const ingredients = await prismaClient.ingredients.findMany({
            where: {
                userId: uid
            }
        })

        return ingredients
    }

    static async getRecipes(ingredients: GetMealRequest) {
        const formattedIngredients = ingredients.ingredients.map(ingredient =>
            ingredient.toLowerCase().replace(/\s+/g, "_")
        );
        if (formattedIngredients.length === 0) {
            const { data } = await axios.get(
                "https://themealdb.com/api/json/v2/65232507/randomselection.php",
            )
            return { meals: data.meals };
        }

        const { data } = await axios.get(
            "https://www.themealdb.com/api/json/v2/65232507/filter.php",
            {
                params: { i: formattedIngredients.join(",") },
            }
        )

        return {
            meals: data.meals || []
        }; 
    }

    static async getRecipeById(rid: number, uid: number) {
        const ingredients = await prismaClient.ingredients.findMany({
            where: { userId: uid },
        })

        const pantrySet = new Set(
            ingredients.map(p => p.name.toLowerCase().trim())
        )
        const { data } = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/lookup.php",
            {
                params: { i: rid },
            }
        )

        const meal = data?.meals?.[0]
        if (!meal) return null

        const recipeIngredients = []

        for (let i = 1; i <= 20; i++) {
            const name = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]

            if (name && name.trim() !== "") {
                const normalizedName = name.toLowerCase().trim()

                recipeIngredients.push({
                    name,
                    measure: measure?.trim() || null,
                    existsInPantry: pantrySet.has(normalizedName),
                })
            }
        }

        const tags = meal.strTags ? meal.strTags.split(",").map((tag: string) => tag.trim()) : [];

        const hasAllIngredients = recipeIngredients.every(
            i => i.existsInPantry
        )

        return {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
            strTags: tags,
            strInstructions: meal.strInstructions,
            strMealThumb: meal.strMealThumb,
            ingredients: recipeIngredients,
            hasAllIngredients,
        }
    }
}
