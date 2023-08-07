import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateRecipe = async (req, res) => {
    const ingredients = req.body?.ingredients?.map(item => item.ingredient).join(', ');
    
    const prompt = `Please write a recipe using those ingredients: ${ingredients},
    please create an object json which includes: title of the recipe, cooking time( cookingTime - in munites), description, instructions, ingredients(as array of strings)`
   
    try {
        const responseImg = await openai.createImage({
            prompt: `a dish made of: ${ingredients}`,
            n: 1,
            size: "512x512",
          });
          
        const image_url = responseImg.data.data[0].url;
        
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: prompt}
            ],
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          
        return res.status(200).json({
            prompt: JSON.parse(response?.data?.choices[0]?.message?.content), image_url: image_url 
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }
}