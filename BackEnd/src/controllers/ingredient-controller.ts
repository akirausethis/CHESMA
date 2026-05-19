import { NextFunction, Response, Request } from "express"
import { IngredientService } from "../services/ingredient-service"
import { CreateIngredientRequest, UpdateIngredientRequest } from "../model/ingredient-model"
import { UserRequest } from "../type/user-request"

export class IngredientController {
    static async getAllIngredients(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await IngredientService.getAllIngredients(req.user!.id)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }


    static async saveIngredient(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request = req.body as CreateIngredientRequest[]
            const response = await IngredientService.createIngredients(request, req.user!.id)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateIngredient(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request = req.body as UpdateIngredientRequest
            request.id = Number(req.params.id)
            const response = await IngredientService.updateIngredient(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    

    static async deleteIngredient(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await IngredientService.deleteIngredient(
                Number(req.params.id)
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}