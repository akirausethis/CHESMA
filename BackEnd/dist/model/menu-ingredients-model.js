"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMealIngredient = fromMealIngredient;
exports.fromMealIngredients = fromMealIngredients;
function fromMealIngredient(mi) {
    var _a;
    return { name: mi.name, measure: (_a = mi.measure) !== null && _a !== void 0 ? _a : null, index: mi.index };
}
function fromMealIngredients(list = []) {
    return list.map(fromMealIngredient);
}
