import { NextFunction, Response, Request } from "express"
import { RecipeService } from "../services/recipe-service"
import { CreateIngredientRequest, UpdateIngredientRequest } from "../model/ingredient-model"
import { UserRequest } from "../type/user-request"
import { GetMealRequest } from "../model/menu-model"

export class RecipeController {
    static async getAllRecipes(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request = req.body as GetMealRequest
            const response = await RecipeService.getRecipes(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getRecipeById(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const recipeId = Number(req.params.id)
            const response = await RecipeService.getRecipeById(recipeId, req.user!.id)
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }   
    }
}