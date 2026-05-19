import React, { useEffect, useState } from 'react';
import { fetchRecipeById } from '../apis/recipeAPI';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Globe,
  Pin,
  ChefHat,
  Sparkles,
  ClipboardList,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [categories, setCategories] = useState('');
  const [area, setArea] = useState('');
  const [instuctions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const getMeal = async () => {
      if (token) {
        const meal = await fetchRecipeById(id, token);
        setRecipeName(meal.data.strMeal);
        setRecipeImage(meal.data.strMealThumb);
        setCategories(meal.data.strCategory);
        setArea(meal.data.strArea);
        setInstructions(meal.data.strInstructions);
        setIngredients(meal.data.ingredients || []);
        setTags(meal.data.strTags || []);
      }
    };

    getMeal();
  }, [id, token]);

  const formattedInstructions = instuctions
    .split(/\r?\n\r?\n/)
    .filter(Boolean);

  const availableIngredients = ingredients.filter(
    (ing) => ing.existsInPantry
  ).length;

  const pantryMatch =
    ingredients.length > 0
      ? Math.round((availableIngredients / ingredients.length) * 100)
      : 0;

  return (
    <div className="animate-fade-in pb-10 w-full px-5">
      {/* ================= BACK BUTTON ================= */}
      <Link
        to="/recipes"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Recipes
      </Link>

      {/* ================= HERO SECTION ================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
        <img
          src={recipeImage}
          alt={recipeName}
          className="w-full h-[420px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Pantry Match Badge */}
        {ingredients.length > 0 && (
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-emerald-600 px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
            <Sparkles size={16} />
            {pantryMatch}% Pantry Match
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <ChefHat size={24} />
            </div>

            <div>
              <p className="text-emerald-200 text-sm font-semibold">
                Smart Recipe Recommendation
              </p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {recipeName}
              </h1>
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.isArray(tags)
                ? tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-bold rounded-full border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))
                : String(tags)
                    .split(',')
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-bold rounded-full border border-white/20"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Pin size={22} />}
          label="Category"
          value={categories || 'Unknown'}
          color="text-orange-600"
          bg="bg-orange-50"
        />

        <StatCard
          icon={<Globe size={22} />}
          label="Cuisine"
          value={area || 'International'}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />

        <StatCard
          icon={<CheckCircle size={22} />}
          label="Pantry Match"
          value={`${pantryMatch}%`}
          color="text-blue-600"
          bg="bg-blue-50"
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <BookOpen size={22} className="text-emerald-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cooking Instructions
                </h2>
                <p className="text-sm text-gray-500">
                  Follow these steps to prepare your meal.
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              {formattedInstructions.length > 0 ? (
                formattedInstructions.map((text, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg">
                      {idx + 1}
                    </div>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  Instructions are not available for this recipe.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 sticky top-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <ClipboardList size={22} className="text-emerald-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Ingredients
                </h3>
                <p className="text-sm text-gray-500">
                  {availableIngredients} of {ingredients.length} available in
                  your pantry
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {ingredients.length > 0 && (
              <div className="mb-6">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-700"
                    style={{ width: `${pantryMatch}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ingredient List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                    ing.existsInPantry
                      ? 'bg-emerald-50 border-emerald-100'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {ing.existsInPantry ? (
                      <CheckCircle
                        size={20}
                        className="text-emerald-500 shrink-0"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-gray-300 shrink-0"
                      />
                    )}

                    <span
                      className={`font-medium ${
                        ing.existsInPantry
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {ing.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-500 whitespace-nowrap ml-3">
                    {ing.measure}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link
                to="/scanPage"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Add Missing Ingredients
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= STAT CARD =================
const StatCard = ({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
}) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <h4 className="text-xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

export default RecipeDetail;