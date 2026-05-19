import React, { useEffect, useState } from 'react';
import { fetchIngredients } from '../apis/ingredientsAPI';
import { fetchRecipes } from '../apis/recipeAPI';
import { Clock, ThumbsUp, Leaf } from 'lucide-react';
// IMPORT FILE DETAIL YANG BARU DIBUAT
import RecipeDetail from './RecipeDetail'; 
import { Link, useNavigate, useParams } from 'react-router-dom';

function Recipes ()  {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [pantryIngredients, setPantryIngredients] = useState<any[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() =>{
    
    const getIngredients = async()  =>{
      if(token){
        const ingredients = await fetchIngredients(token);
        setPantryIngredients(ingredients.data)
      }
    }

    getIngredients()
    
  }, [token])

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name)
        ? prev.filter(i => i !== name)
        : [...prev, name]
    );
  };

  useEffect(() => {
  const getRecipes = async () => {
    if(token){
      const meals = await fetchRecipes(
      selectedIngredients.length ? selectedIngredients : [],
      token
    );
      setRecipes(meals.data.meals || []);
    }
    
  };

  getRecipes();
}, [selectedIngredients, token]);
  // JIKA TIDAK, Render Halaman List Resep (Grid)
  return (
    <div className="animate-fade-in pb-10  w-full px-5">
      
      {/* Header & Filters */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-dark mb-6">Suggested Recipes</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {pantryIngredients.map(item => (
            <button
              key={item.id}
              onClick={() => toggleIngredient(item.name)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                selectedIngredients.includes(item.name)
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {recipes.length === 0 ? (
          <p className="text-gray-400">No recipes match selected ingredients.</p>
        ) : (
          recipes.map(meal => (
            <RecipeCard
              key={meal.idMeal}
              id = {meal.idMeal}
              title={meal.strMeal}
              image={meal.strMealThumb}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Component Card tetap di sini karena hanya dipakai oleh list
const RecipeCard = ({ id,image, title}) => (
  <div 
    className="bg-white rounded-3xl shadow-soft border border-gray-50 overflow-hidden group hover:shadow-xl transition duration-300 flex flex-col h-full cursor-pointer"
  >
    <div className="h-48 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
    </div>

    <div className="p-5 flex-1 flex flex-col">
      <h3 className="font-bold text-xl text-brand-dark mb-2 leading-tight">{title}</h3>
      <Link to={`/recipes/${id}`} className="mt-auto w-full bg-brand-primary text-center text-white font-bold py-3 rounded-xl shadow-lg shadow-green-100 group-hover:bg-brand-dark group-hover:shadow-none transition">
        View Recipe
      </Link>
    </div>
  </div>
);

export default Recipes;