import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { logger } from "../application/logging";

// const genAI = new GoogleGenerativeAI("AIzaSyBMS3yjFOSgQWGDeUbyyYHm89s92IFlIt0");
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

export class AIService {
    static async detectIngredients(imagePath: string): Promise<string[]> {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString("base64");

        const prompt = `
            Analyze this image of food ingredients. 
            Identify the raw ingredients visible.
            
            Return ONLY a raw JSON array of objects. 
            Each object must strictly follow this structure:
            {
                "name": string (e.g. "chicken", "egg"),
                "quantity": number (estimate the amount, default to 1),
                "unit": string (MUST be one of: "pcs", "kg", "grams", "lt", "pack", "other")
            }

            Rules:
            1. If the unit is unclear, use "pcs".
            2. Do not use markdown formatting like \`\`\`json.
            3. Do not include any conversational text.
            
            Example output: 
            [
                {"name": "chicken breast", "quantity": 1, "unit": "kg"},
                {"name": "garlic", "quantity": 3, "unit": "pcs"},
                {"name": "milk", "quantity": 1, "unit": "lt"}
            ]
        `;

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg", 
            },
        };

        try {
            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            const text = response.text();

            const cleanText = text.replace(/```json|```/g, "").trim();
            
            logger.info("AI Response: " + cleanText);

            const ingredients: string[] = JSON.parse(cleanText);
            return ingredients;
        } catch (error) {
            logger.error(error);
            throw new Error("Failed to identify ingredients from image");
        }
    }
}
