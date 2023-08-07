import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    ingredients: [{type: String, require: true}],
    instructions: {type: String, require: true},
    imageUrl: {type: String, require: true},
    cookingTime: {type: Number, require: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", require: true}, 
});



const IngredientsSchema = new mongoose.Schema({
    ingredient: {type: String, require: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", require: true}, 
});

export const RecipeModel = mongoose.model("reciepes", RecipeSchema);

export const IngredientsModel = mongoose.model("ingredients", IngredientsSchema);