import { prismaClient } from "../application/database";
import { CreateIngredientRequest, IngredientResponse, UpdateIngredientRequest } from "../model/ingredient-model";
import { logger } from "../application/logging";
import axios from "axios";




export class IngredientService {
    static async getAllIngredients(uid: number): Promise<IngredientResponse[]> {
        const ingredients = await prismaClient.ingredients.findMany({
            where: {
                userId: uid
            }
        })

        return ingredients
    }


    static async createIngredients(
        reqs: Array<CreateIngredientRequest>,
        uid: number
    ): Promise<string> {
        return await prismaClient.$transaction(async (tx) => {
            // 1. Find existing ingredients
            const existing = await tx.ingredients.findMany({
                where: {
                    userId: uid,
                    OR: reqs.map(req => ({
                        name: req.name,
                        unit: req.unit
                    }))
                }
            })

            // 2. Map existing for quick lookup
            const existingMap = new Map(
                existing.map(i => [`${i.name}-${i.unit}`, i])
            )

            const toCreate = []
            const toUpdate = []

            for (const req of reqs) {
                const key = `${req.name}-${req.unit}`
                const found = existingMap.get(key)

                if (found) {
                    // add quantity
                    toUpdate.push(
                        tx.ingredients.update({
                            where: { id: found.id },
                            data: {
                                quantity: found.quantity + req.quantity
                            }
                        })
                    )
                } else {
                    // create new ingredient
                    toCreate.push({
                        name: req.name,
                        unit: req.unit,
                        quantity: req.quantity,
                        userId: uid
                    })
                }
            }

            // 3. Execute updates
            await Promise.all(toUpdate)

            // 4. Execute creates
            if (toCreate.length > 0) {
                await tx.ingredients.createMany({
                    data: toCreate
                })
            }

            return "Ingredient(s) Successfully Created or Updated"
        })
    }


    static async updateIngredient(req: UpdateIngredientRequest): Promise<String> {

        const updateIngredient = await prismaClient.ingredients.update({
            where: {
                id: req.id
            },
            data: {
                name: req.name,
                quantity: req.quantity,
                unit: req.unit
            }
        })

        logger.info("UPDATE RESULT: " + updateIngredient)

        return "Ingredient update was successful!"

    }

    static async deleteIngredient(id: number): Promise<string> {
        await prismaClient.ingredients.delete({
            where: {
                id: id
            }
        })

        return "Ingredient delete was successful"
    }


    static async getRecipes(uid: number) {
        const ingredients = await prismaClient.ingredients.findMany({
            where: {
                userId: uid
            }
        })
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

        const hasAllIngredients = recipeIngredients.every(
            i => i.existsInPantry
        )

        return {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
            strInstructions: meal.strInstructions,
            strMealThumb: meal.strMealThumb,
            ingredients: recipeIngredients,
            hasAllIngredients,
        }
    }
}
