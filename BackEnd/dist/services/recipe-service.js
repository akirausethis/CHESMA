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
exports.RecipeService = void 0;
const database_1 = require("../application/database");
const axios_1 = __importDefault(require("axios"));
class RecipeService {
    static getAllRecipes(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredients = yield database_1.prismaClient.ingredients.findMany({
                where: {
                    userId: uid
                }
            });
            return ingredients;
        });
    }
    static getRecipes(ingredients) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedIngredients = ingredients.ingredients.map(ingredient => ingredient.toLowerCase().replace(/\s+/g, "_"));
            if (formattedIngredients.length === 0) {
                const { data } = yield axios_1.default.get("https://themealdb.com/api/json/v2/65232507/randomselection.php");
                return { meals: data.meals };
            }
            const { data } = yield axios_1.default.get("https://www.themealdb.com/api/json/v2/65232507/filter.php", {
                params: { i: formattedIngredients.join(",") },
            });
            return {
                meals: data.meals || []
            };
        });
    }
    static getRecipeById(rid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const ingredients = yield database_1.prismaClient.ingredients.findMany({
                where: { userId: uid },
            });
            const pantrySet = new Set(ingredients.map(p => p.name.toLowerCase().trim()));
            const { data } = yield axios_1.default.get("https://www.themealdb.com/api/json/v1/1/lookup.php", {
                params: { i: rid },
            });
            const meal = (_a = data === null || data === void 0 ? void 0 : data.meals) === null || _a === void 0 ? void 0 : _a[0];
            if (!meal)
                return null;
            const recipeIngredients = [];
            for (let i = 1; i <= 20; i++) {
                const name = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (name && name.trim() !== "") {
                    const normalizedName = name.toLowerCase().trim();
                    recipeIngredients.push({
                        name,
                        measure: (measure === null || measure === void 0 ? void 0 : measure.trim()) || null,
                        existsInPantry: pantrySet.has(normalizedName),
                    });
                }
            }
            const tags = meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [];
            const hasAllIngredients = recipeIngredients.every(i => i.existsInPantry);
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
            };
        });
    }
}
exports.RecipeService = RecipeService;
