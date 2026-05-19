
import { Ingredient } from '../models/ingredient-model';
import axios from 'axios';



export const login = async (email :string, password :string) =>{
    try {
        const response = await axios.post("http://localhost:3000/api/login", {
             email: email, password: password
        },
        {
            headers: { "Content-Type": "application/json" }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

export const logout = async (token:string) =>{
    try {
        const response = await axios.post("http://localhost:3000/api/logout",{},
       {
           headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
       });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}


export const register = async (username:string, email:string, password:string) =>{
    try {
        const response = await axios.post("http://localhost:3000/api/register", {
            username: username,
            email: email,
            password: password
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}



