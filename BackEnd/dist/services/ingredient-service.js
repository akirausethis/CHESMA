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
exports.IngredientService = void 0;
const database_1 = require("../application/database");
const logging_1 = require("../application/logging");
const axios_1 = __importDefault(require("axios"));
class IngredientService {
    static getAllIngredients(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredients = yield database_1.prismaClient.ingredients.findMany({
                where: {
                    userId: uid
                }
            });
            return ingredients;
        });
    }
    static createIngredients(reqs, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // 1. Find existing ingredients
                const existing = yield tx.ingredients.findMany({
                    where: {
                        userId: uid,
                        OR: reqs.map(req => ({
                            name: req.name,
                            unit: req.unit
                        }))
                    }
                });
                // 2. Map existing for quick lookup
                const existingMap = new Map(existing.map(i => [`${i.name}-${i.unit}`, i]));
                const toCreate = [];
                const toUpdate = [];
                for (const req of reqs) {
                    const key = `${req.name}-${req.unit}`;
                    const found = existingMap.get(key);
                    if (found) {
                        // add quantity
                        toUpdate.push(tx.ingredients.update({
                            where: { id: found.id },
                            data: {
                                quantity: found.quantity + req.quantity
                            }
                        }));
                    }
                    else {
                        // create new ingredient
                        toCreate.push({
                            name: req.name,
                            unit: req.unit,
                            quantity: req.quantity,
                            userId: uid
                        });
                    }
                }
                // 3. Execute updates
                yield Promise.all(toUpdate);
                // 4. Execute creates
                if (toCreate.length > 0) {
                    yield tx.ingredients.createMany({
                        data: toCreate
                    });
                }
                return "Ingredient(s) Successfully Created or Updated";
            }));
        });
    }
    static updateIngredient(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateIngredient = yield database_1.prismaClient.ingredients.update({
                where: {
                    id: req.id
                },
                data: {
                    name: req.name,
                    quantity: req.quantity,
                    unit: req.unit
                }
            });
            logging_1.logger.info("UPDATE RESULT: " + updateIngredient);
            return "Ingredient update was successful!";
        });
    }
    static deleteIngredient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.ingredients.delete({
                where: {
                    id: id
                }
            });
            return "Ingredient delete was successful";
        });
    }
    static getRecipes(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredients = yield database_1.prismaClient.ingredients.findMany({
                where: {
                    userId: uid
                }
            });
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
            const hasAllIngredients = recipeIngredients.every(i => i.existsInPantry);
            return {
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strCategory: meal.strCategory,
                strArea: meal.strArea,
                strInstructions: meal.strInstructions,
                strMealThumb: meal.strMealThumb,
                ingredients: recipeIngredients,
                hasAllIngredients,
            };
        });
    }
}
exports.IngredientService = IngredientService;
