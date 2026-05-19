"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIngredientResponse = toIngredientResponse;
exports.toIngredientResponseList = toIngredientResponseList;
function toIngredientResponse(ingredient) {
    return {
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
    };
}
function toIngredientResponseList(ingredients) {
    const result = ingredients.map((ingredient) => {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
        };
    });
    return result;
}
