"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMealDetail = parseMealDetail;
/**
 * Parse a RawMealDetail returned by TheMealDB (fields strIngredient1..20 and strMeasure1..20)
 * into a MealDetail with an `ingredients` array.
 */
function parseMealDetail(raw) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const name = raw[ingKey];
        const measure = raw[measureKey];
        if (name && typeof name === 'string' && name.trim() !== '') {
            ingredients.push({ name: name.trim(), measure: measure ? String(measure).trim() : null, index: i });
        }
    }
    return {
        idMeal: raw.idMeal,
        strMeal: raw.strMeal,
        strMealAlternate: (_a = raw.strMealAlternate) !== null && _a !== void 0 ? _a : null,
        strCategory: (_b = raw.strCategory) !== null && _b !== void 0 ? _b : null,
        strArea: (_c = raw.strArea) !== null && _c !== void 0 ? _c : null,
        strInstructions: (_d = raw.strInstructions) !== null && _d !== void 0 ? _d : null,
        strMealThumb: (_e = raw.strMealThumb) !== null && _e !== void 0 ? _e : null,
        strTags: (_f = raw.strTags) !== null && _f !== void 0 ? _f : null,
        strYoutube: (_g = raw.strYoutube) !== null && _g !== void 0 ? _g : null,
        strSource: (_h = raw.strSource) !== null && _h !== void 0 ? _h : null,
        strImageSource: (_j = raw.strImageSource) !== null && _j !== void 0 ? _j : null,
        strCreativeCommonsConfirmed: (_k = raw.strCreativeCommonsConfirmed) !== null && _k !== void 0 ? _k : null,
        dateModified: (_l = raw.dateModified) !== null && _l !== void 0 ? _l : null,
        ingredients,
    };
}
