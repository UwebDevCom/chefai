import { createRecipe, allRecipe, handleRecipe, savedRecipes, savedRecipeIds, createIngredinet, allIngredinet } from '../controllers/reciepes.js'
import { verifyToken } from '../middlewears/verify-token.js';
import { generateRecipe } from '../controllers/generateRecipe.js';

export default (router) => {
    router.get("/recipes", allRecipe);
    router.post("/generate-recipe", verifyToken, generateRecipe);
    router.post("/recipes", createRecipe);
    router.put("/recipes", verifyToken, handleRecipe);
    router.post("/add-new-ingredient", createIngredinet);
    router.get("/ingredients", allIngredinet);
    router.get("/saved-recipes/ids/:userId", savedRecipeIds);
    router.get("/saved-recipes/:userId",verifyToken, savedRecipes);
}