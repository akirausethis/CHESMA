import React, { useEffect, useState } from 'react';
import { fetchRecipeById } from '../apis/recipeAPI';
import { ArrowLeft, Clock, Flame, Users, ThumbsUp, Leaf, CheckCircle, Circle, Globe, Pin } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function RecipeDetail ()  {


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

  useEffect(()=>{
    const getMeal= async () =>{
      if(token){
        const meal = await fetchRecipeById(id,token);
        setRecipeName(meal.data.strMeal);
        setRecipeImage(meal.data.strMealThumb);
        setCategories(meal.data.strCategory);
        setArea(meal.data.strArea);
        setInstructions(meal.data.strInstructions);
        setIngredients(meal.data.ingredients || []);
        setTags(meal.data.strTags || []);
    }
    }
    getMeal()
  },[id, token])

  const formattedInstructions = instuctions
  .split(/\r?\n\r?\n/)
  .filter(Boolean);
  
  
  // Fallback jika data resep belum lengkap (misal dari database masih loading)

  return (
    <div className="animate-fade-in pb-10 w-full px-5">
      
      {/* Tombol Back */}
      <Link
        to={
          "/recipes"
        } 
        className="flex items-center gap-2 text-gray-500 hover:text-brand-dark mb-6 transition font-medium"
      >
        <ArrowLeft size={20} /> Back to Recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === KOLOM KIRI: Tampilan Utama & Instruksi === */}
        <div className="lg:col-span-2">
          
          {/* Hero Image */}
          <div className="rounded-3xl overflow-hidden shadow-soft mb-8 relative group">
            {/* {recipeImage && ( */}
              <img
                src={recipeImage}
                alt={recipeName}
                className="w-full h-80 object-cover"
              />
            {/* )} */}
            <div className="absolute top-4 right-4 bg-brand-primary text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              {/* <Leaf size={16} /> {recipe.match}% Pantry Match */}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
               <h1 className="text-4xl font-bold text-white mb-2 shadow-sm">{recipeName}</h1>
               <p className="text-gray-200 text-lg shadow-sm">{}</p>
            </div>
          </div>

          {/* Statistik Cepat (Waktu, Kalori, dll) */}
          <div className="flex justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
             <StatBadge icon={<Pin size={20}/>} label="Category" value={categories} color="text-orange-600" bg="bg-orange-50" />
             <StatBadge icon={<Globe size={20}/>} label="Servings" value={area} color="text-brand-primary" bg="bg-brand-light" />
          </div>

          {/* Langkah Memasak */}
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-50">
            <h3 className="text-2xl font-bold text-brand-dark mb-6">Instructions</h3>
            <div className="space-y-6">
              {formattedInstructions.map((text, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {text}
                </p>
              ))}
              
            </div>
          </div>
        </div>

        {/* === KOLOM KANAN: Bahan & Checklist === */}
        <div>
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-50 sticky top-6">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Ingredients</h3>
            
            {/* List Bahan */}
            <div className="space-y-3 mb-6">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                   <div className="flex items-center gap-3">
                      {/* Logic: Checkbox Hijau kalau ada di pantry */}
                      {ing.existsInPantry ? (
                        <CheckCircle size={20} className="text-brand-primary shrink-0" />
                      ) : (
                        <Circle size={20} className="text-gray-300 shrink-0" />
                      )}
                      <span className={`font-medium ${ing.existsInPantry ? 'text-gray-800' : 'text-gray-400'}`}>
                        {ing.name}
                      </span>
                   </div>
                   <span className="text-sm text-gray-500 whitespace-nowrap">{ing.measure}</span>
                </div>
              ))}
            </div>
        

            {/* <button className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 hover:bg-brand-dark transition transform hover:-translate-y-1">
               Start Cooking Mode
            </button> */}
          </div>
        </div>
        

      </div>
    </div>
  );
};

// Komponen Kecil untuk Statistik
const StatBadge = ({ icon, label, value, color, bg }) => (
  <div className="flex items-center gap-3 min-w-[100px]">
    <div className={`p-3 rounded-full ${bg} ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="font-bold text-gray-800 text-sm whitespace-nowrap">{value}</p>
    </div>
  </div>
);

export default RecipeDetail;