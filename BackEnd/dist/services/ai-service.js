"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const fs_1 = __importDefault(require("fs"));
const logging_1 = require("../application/logging");
// const genAI = new GoogleGenerativeAI("AIzaSyBMS3yjFOSgQWGDeUbyyYHm89s92IFlIt0");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY || "");
class AIService {
    static detectIngredients(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const imageBuffer = fs_1.default.readFileSync(imagePath);
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
                const result = yield model.generateContent([prompt, imagePart]);
                const response = yield result.response;
                const text = response.text();
                const cleanText = text.replace(/```json|```/g, "").trim();
                logging_1.logger.info("AI Response: " + cleanText);
                const ingredients = JSON.parse(cleanText);
                return ingredients;
            }
            catch (error) {
                logging_1.logger.error(error);
                throw new Error("Failed to identify ingredients from image");
            }
        });
    }
}
exports.AIService = AIService;
