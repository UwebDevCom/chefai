import { IngredientsModel, RecipeModel } from "../models/Recipes.js"
import { UserModel } from "../models/Users.js";
import * as fs from 'fs';
import axios from 'axios';

export const createRecipe = async (req, res) => {
    const recipe = new RecipeModel(req.body);
    
    try {
        const download = async(url, filepath) => {
            const response = await axios({
              url,
              method: 'GET',
              responseType: 'stream',
            })
            return new Promise((resolve, reject) => {
              response.data
                .pipe(fs.createWriteStream(filepath))
                .on('error', reject)
                .once('close', () => resolve(filepath))
            })
          }

        const response = await recipe.save();
        download(recipe.imageUrl, '../client/src/assets/' + response._id + '_img' + '.jpg');   
        res.json(response);
    } catch(err) {
        console.log(err);
    }

}



export const allRecipe = async (req, res) => {
    const {query: {search} } = req;
    try {

        if (search) {
            const response = await RecipeModel.find({"name": new RegExp(search, 'i')});
            return res.json(response);
        }
        const response = await RecipeModel.find({});
        res.json(response);
    
    } catch(err) {
        res.json(err);
    }

}

export const handleRecipe = async (req, res) => {
    const {userId, recipeId} = req.body;
   
    try {
        const recipe_id = await RecipeModel.findById(recipeId);
        const user = await UserModel.findById(userId);
        const isExist = user.savedRecipes.find(savedRecipe => savedRecipe._id.toString() === recipe_id._id.toString());
        if (isExist) {
            removeRecipe(req, res);
        } else {
            saveRecipe(req, res);
        }
    } catch(err) {
        res.json(err);
    }
}


export const saveRecipe = async (req, res) => {
   
    const {userId, recipeId} = req.body;
    try {
        const recipe_id = await RecipeModel.findById(recipeId);
        const user = await UserModel.findById(userId);
        user.savedRecipes.push(recipe_id);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    
    } catch(err) {
        res.json(err);
    }

}


export const removeRecipe = async (req, res) => {
    const {userId, recipeId} = req.body;
    
    try {
        const recipe_id = await RecipeModel.findById(recipeId);
        const user = await UserModel.findById(userId);
        user.savedRecipes = [...user.savedRecipes.filter(recipe => recipe._id.toString() !== recipe_id._id.toString())];
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    
    } catch(err) {
        res.json(err);
    }

}

export const savedRecipeIds = async (req, res) => {
    const {userId} = req.params;
    
    try {
        const user = await UserModel.findById(userId);
        res.json({savedRecipes: user?.savedRecipes});
    
    } catch(err) {
        res.json(err);
    }

}

export const savedRecipes = async (req, res) => {
    const {userId} = req.params;
    
    try {
        const user = await UserModel.findById(userId);
        const savedRecipe = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        });

        res.json({ savedRecipe });
    
    } catch(err) {
        res.json(err);
    }

}

export const allIngredinet = async (req, res) => {
    try {
        const response = await IngredientsModel.find({});
        return res.json(response);
    
    } catch(err) {
        res.json(err);
    }

}

export const searchRecipe = async (req, res) => {
    const {search} = req.query;
    console.log(search);

    try {
        const response = await RecipeModel.find({"name": /.*m.*/});
        return res.json(response);
    
    } catch(err) {
        res.json(err);
    }

}

export const createIngredinet = async (req, res) => {
    const {ingredient, userOwner: userId} = req.body;
    
    try {    
        const isExistIngredient = await IngredientsModel.findOne({ingredient: ingredient});
        if (isExistIngredient) {
            res.sendStatus(400);
            return res.json({massage: "ingredient exists"});
        }
       
        const newIngredient = new IngredientsModel({ingredient, userOwner: userId});
        const response = await newIngredient.save(); 
        res.status(200).json(response).end();

    } catch(err) {
        res.json(err);
    }

}