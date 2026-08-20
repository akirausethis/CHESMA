import React, { useEffect, useState } from 'react';
import { fetchIngredients } from '../apis/ingredientsAPI';
import { fetchRecipes } from '../apis/recipeAPI';
import {
  ChefHat,
  Sparkles,
  Filter,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

function Recipes() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [pantryIngredients, setPantryIngredients] = useState<any[]>([]);
  const token = localStorage.getItem('token');

  // ================= FETCH PANTRY INGREDIENTS =================
  useEffect(() => {
    const getIngredients = async () => {
      if (token) {
        const ingredients = await fetchIngredients(token);
        setPantryIngredients(ingredients.data);
      }
    };

    getIngredients();
  }, [token]);

  // ================= TOGGLE SELECTED INGREDIENT =================
  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name)
        ? prev.filter((i) => i !== name)
        : [...prev, name]
    );
  };

  // ================= FETCH RECIPES =================
  useEffect(() => {
    const getRecipes = async () => {
      if (token) {
        const meals = await fetchRecipes(
          selectedIngredients.length ? selectedIngredients : [],
          token
        );
        setRecipes(meals.data.meals || []);
      }
    };

    getRecipes();
  }, [selectedIngredients, token]);

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Smart Recipes
          </h1>
          <p className="text-gray-500 mt-2">
            Discover delicious recipes based on your pantry ingredients.
          </p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 w-fit">
           <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
             <ChefHat size={24} />
           </div>
           <div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recipes Found</p>
             <p className="text-2xl font-black text-gray-900 leading-none mt-1">{recipes.length}</p>
           </div>
        </div>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="mb-8 bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <Filter size={18} className="text-gray-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Filter by Ingredients
            </h2>
            <p className="text-sm text-gray-500">
              Select ingredients from your pantry to refine recipe suggestions.
            </p>
          </div>
        </div>

        {pantryIngredients.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {pantryIngredients.map((item) => {
              const isSelected = selectedIngredients.includes(item.name);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
            <Package
              size={32}
              className="mx-auto mb-3 text-gray-300"
            />
            <p className="text-gray-500 text-sm">
              No pantry ingredients available yet.
            </p>
            <Link
              to="/scanPage"
              className="inline-flex items-center gap-2 mt-4 text-emerald-600 font-bold text-sm hover:text-emerald-700"
            >
              Add Ingredients <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* ================= RECIPE GRID ================= */}
      {recipes.length === 0 ? (
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
            <ChefHat size={36} className="text-gray-300" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Recipes Found
          </h3>

          <p className="text-sm text-gray-500 max-w-sm">
            {selectedIngredients.length > 0
              ? 'Try selecting different ingredients to discover more recipes.'
              : 'Add ingredients to your pantry to get personalized recipe recommendations.'}
          </p>

          <Link
            to="/scanPage"
            className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Add Ingredients
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recipes.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              id={meal.idMeal}
              title={meal.strMeal}
              image={meal.strMealThumb}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ================= RECIPE CARD =================
const RecipeCard = ({
  id,
  image,
  title,
}: {
  id: string;
  image: string;
  title: string;
}) => (
  <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
    {/* Image */}
    <div className="h-56 relative overflow-hidden bg-gray-100">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

      {/* Badge */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-emerald-600 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
        <Sparkles size={12} />
        AI Match
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
        Delicious recipe perfectly tailored to your current pantry inventory.
      </p>

      <Link
        to={`/recipes/${id}`}
        className="mt-auto w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white text-center font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-200"
      >
        View Recipe
        <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

export default Recipes;
