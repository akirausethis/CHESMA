import { Request, Response, NextFunction } from "express";
import { AIService } from "../services/ai-service";
import { RecipeService } from "../services/recipe-service";
import fs from "fs";

export class ScanController {
    static async scanAndRecommend(req: Request, res: Response, next: NextFunction) {
        try {
            // Cek apakah ini itu file gambar apa ndak
            if (!req.file) {
                throw new Error("Image file is required");
            }

            // Minta gemini deteksi iki makanan apa
            const detectedIngredients = await AIService.detectIngredients(req.file.path);

            const ingredientNames = (detectedIngredients as any[]).map(item => item.name);

            // Langsung nyari resep pakai service sg ws kita punyak
            const recipeResult = await RecipeService.getRecipes({ 
                ingredients: ingredientNames 
            });

            // apus file smntara syek biar server e ga penuh
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            res.status(200).json({
                data: {
                    detected_ingredients: detectedIngredients,
                    recipes: recipeResult.meals
                }
            });

        } catch (error) {
            // Hapus file kalau error biar ga berat
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            next(error);
        }
    }
}