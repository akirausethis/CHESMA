import dotenv from 'dotenv'
import { Ingredient } from '../models/ingredient-model';
import axios from 'axios';


async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );
  return `data:${file.type};base64,${base64}`;
}

export async function uploadImageToOpenRouter(file: File) {
    const OPENROUTER_UPLOAD_URL = 'https://api.openrouter.ai/v1/nvidia/nemotron-nano-12b-v2-vl:free';
	const key = dotenv.config().parsed?.API_KEY;
	if (!key) throw new Error('API_KEY in environment');
    const base64Image = await fileToBase64(file);

	const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'nvidia/nemotron-nano-12b-v2-vl:free',
            messages: [
            {
                role: 'user',
                content: [
                {
                    type: 'text',
                    text: "What's in this image?",
                },
                {
                    type: 'image_url',
                    image_url: {
                    url: base64Image,
                    },
                },
                ],
            },
            ],
            tools: [
                {
                    name: "extract_ingredients",
                    description: "Extract food ingredients from an image",
                    parameters: {
                        type: "object",
                        properties: {
                        ingredients: {
                            type: "array",
                            items: {
                            type: "object",
                            properties: {
                                name: {
                                type: "string",
                                description: "Name of the ingredient"
                                },
                                quantity: {
                                type: "number",
                                description: "Estimated quantity",
                                default: 1
                                },
                                unit: {
                                type: "string",
                                description: "Unit of measurement",
                                default: "pcs"
                                }
                            },
                            required: ["name"]
                            }
                        }
                        },
                        required: ["ingredients"]
                    }
                }
            ]
        }),
    });

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`OpenRouter upload failed: ${text}`);
	}

	return res.json();
}

export async function fetchIngredients(token: string){
    try{
        const response = await axios.get(`http://localhost:3000/api/ingredient`,
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

export async function saveIngredients(ingredients: Ingredient[], token){
    try{
        const response = await axios.post(`http://localhost:3000/api/ingredient`,
            ingredients,
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

export async function scanImage(file: File, token: string) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post('http://localhost:3000/api/scan-recipe', 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-TOKEN': token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error scanning image:", error);
        throw error;
    }
}

export async function deleteIngredients(id: number, token: string){
    try{
        const response = await axios.delete(`http://localhost:3000/api/ingredient/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'X-API-TOKEN': token
            }
        });
        return response.data;
    }catch(error){
        console.error("Error deleting ingredient:", error);
        throw error;
    }
}

export async function updateIngredient(id: number, updatedData: Partial<Ingredient>, token: string){
    try{
        const response = await axios.put(`http://localhost:3000/api/ingredient/${id}`,
            updatedData,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-API-TOKEN': token
            }
        });
        return response.data;
    }catch(error){
        console.error("Error updating ingredient:", error);
        throw error;
    }   
}

export default { uploadImageToOpenRouter };