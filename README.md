# ALP-AI-SmartChef
Welcome to the AI Smart Chef application! This full-stack project consists of a 
Node.js/Express backend and a React/Vite frontend.

Follow the instructions below to set up and run the application.


# Features



* Scan Image to detect ingredients using AI

* Pantry / Ingredients Management

* Recipe Finder based on the Ingredients using MealDB API


# PREREQUISITES


1. Node.js (v18+ recommended)
2. PostgreSQL (Database)
3. Google Gemini API Key (For AI features)


#  BACKEND SETUP


1. Navigate to the backend directory:
   cd BackEnd

2. Install Production Dependencies:
   npm install @google/generative-ai @prisma/client axios bcrypt cors dotenv express multer uuid winston zod

3. Install Development Dependencies:
   npm install -D @types/bcrypt @types/cors @types/express @types/multer @types/node nodemon prisma ts-node typescript

4. Configure Environment Variables:
   Create a file named ".env" in the backend folder and add:
   
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name?schema=public"
   API_KEY="your_google_gemini_api_key"
   

5. Setup Database:
   npx prisma generate
   npx prisma migrate dev --name init

6. Build the Server:
   npm run build

7. Start the Server:
   npm run dev

   if npm run dev does not work
   npm start


# FRONTEND SETUP


1. Navigate to the frontend directory:
   cd FrontEnd/aismartschefweb/smart-chef-app

2. Install Production Dependencies:
   npm install axios dotenv env fs lucide-react react react-dom react-router-dom

3. Install Development Dependencies:
   npm install -D @eslint/js @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-react autoprefixer eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss typescript vite

4. Start the Application:
   npm run dev

   Access the app at: http://localhost:5173


# TROUBLESHOOTING


* "fs" Module Error in Frontend: 
  The frontend package.json includes "fs" which is a Node.js server-side module. 
  If Vite throws an error about "fs", remove it from package.json and run npm install again.

* Database Connection: 
  Ensure your PostgreSQL server is running and the DATABASE_URL in the backend 
  .env file is correct.

* AI Features: 
  If scanning fails, verify your API_KEY is active and has credits.





