"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanController = void 0;
const ai_service_1 = require("../services/ai-service");
const recipe_service_1 = require("../services/recipe-service");
const fs_1 = __importDefault(require("fs"));
class ScanController {
    static scanAndRecommend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cek apakah ini itu file gambar apa ndak
                if (!req.file) {
                    throw new Error("Image file is required");
                }
                // Minta gemini deteksi iki makanan apa
                const detectedIngredients = yield ai_service_1.AIService.detectIngredients(req.file.path);
                const ingredientNames = detectedIngredients.map(item => item.name);
                // Langsung nyari resep pakai service sg ws kita punyak
                const recipeResult = yield recipe_service_1.RecipeService.getRecipes({
                    ingredients: ingredientNames
                });
                // apus file smntara syek biar server e ga penuh
                if (fs_1.default.existsSync(req.file.path)) {
                    fs_1.default.unlinkSync(req.file.path);
                }
                res.status(200).json({
                    data: {
                        detected_ingredients: detectedIngredients,
                        recipes: recipeResult.meals
                    }
                });
            }
            catch (error) {
                // Hapus file kalau error biar ga berat
                if (req.file && fs_1.default.existsSync(req.file.path)) {
                    fs_1.default.unlinkSync(req.file.path);
                }
                next(error);
            }
        });
    }
}
exports.ScanController = ScanController;
