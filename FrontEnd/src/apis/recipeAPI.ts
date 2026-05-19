import dotenv from 'dotenv'
import { Ingredient } from '../models/ingredient-model';
import axios from 'axios';


export async function fetchRecipes(ingredients: string[], token: string){

  try{
    const response = await axios.post(`http://localhost:3000/api/recipes`,{
            ingredients: ingredients
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-API-TOKEN': token
            }

        },

    );

        return response.data

    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

export async function fetchRecipeById(id: string, token: string){
    try{
        const response = await axios.get(`http://localhost:3000/api/recipe/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'X-API-TOKEN': token
            }
        },

    );
        return response.data
    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }   
}
