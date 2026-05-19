import React, { useEffect, useState } from 'react';
import { fetchIngredients } from '../apis/ingredientsAPI';
import { fetchRecipes } from '../apis/recipeAPI';
import {
  ChefHat,
  Sparkles,
  Search,
  Filter,
  Clock,
  ThumbsUp,
  Leaf,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Recipes() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [pantryIngredients, setPantryIngredients] = useState<any[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="animate-fade-in w-full px-5 pb-10">
      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ChefHat size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">
                Smart Recipe Recommendations
              </h1>
              <p className="text-emerald-100 mt-1">
                Discover delicious recipes based on your pantry ingredients.
              </p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <p className="text-sm text-emerald-50">Recipes Found</p>
            <p className="text-3xl font-extrabold">{recipes.length}</p>
          </div>
        </div>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Filter size={18} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Filter by Ingredients
            </h2>
            <p className="text-sm text-gray-500">
              Select ingredients from your pantry to refine recipe suggestions.
            </p>
          </div>
        </div>

        {pantryIngredients.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {pantryIngredients.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleIngredient(item.name)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 whitespace-nowrap ${
                  selectedIngredients.includes(item.name)
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-transparent shadow-lg shadow-emerald-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <Package
              size={32}
              className="mx-auto mb-3 text-gray-300"
            />
            <p className="text-gray-500">
              No pantry ingredients available yet.
            </p>
            <Link
              to="/scanPage"
              className="inline-flex items-center gap-2 mt-4 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Add Ingredients <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* ================= SELECTED FILTERS ================= */}
      {selectedIngredients.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold"
            >
              {ingredient}
            </span>
          ))}
        </div>
      )}

      {/* ================= RECIPE GRID ================= */}
      {recipes.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6">
            <ChefHat size={42} className="text-emerald-400" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Recipes Found
          </h3>

          <p className="text-gray-500 max-w-md">
            {selectedIngredients.length > 0
              ? 'Try selecting different ingredients to discover more recipes.'
              : 'Add ingredients to your pantry to get personalized recipe recommendations.'}
          </p>

          <Link
            to="/scanPage"
            className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
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
  <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
    {/* Image */}
    <div className="h-56 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Badge */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
        <Sparkles size={12} />
        AI Pick
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-bold text-2xl text-gray-900 mb-3 leading-tight line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
        Delicious and easy-to-make recipe tailored to your pantry.
      </p>

      <Link
        to={`/recipes/${id}`}
        className="mt-auto w-full bg-gradient-to-r from-emerald-500 to-green-600 text-center text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
      >
        View Recipe
        <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

export default Recipes;