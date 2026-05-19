import express from "express"
import multer from "multer";
import { authMiddleware } from "../middlware/auth-middleware"
import { AuthController } from "../controllers/user-controller"
import { IngredientController } from "../controllers/ingredient-controller"
import { RecipeController } from "../controllers/recipe-controller"
import { ScanController } from "../controllers/scan-controller";

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

const upload = multer({ dest: "uploads/" });


apiRouter.post("/api/logout", AuthController.logout)
apiRouter.post("/api/ingredient", IngredientController.saveIngredient)

apiRouter.get("/api/ingredient", IngredientController.getAllIngredients)
apiRouter.put("/api/ingredient/:id(\\d+)", IngredientController.updateIngredient)
apiRouter.delete("/api/ingredient/:id(\\d+)", IngredientController.deleteIngredient)
apiRouter.post("/api/recipes", RecipeController.getAllRecipes)
apiRouter.get("/api/recipe/:id(\\d+)", RecipeController.getRecipeById)
apiRouter.post("/api/scan-recipe", upload.single("image"), ScanController.scanAndRecommend);