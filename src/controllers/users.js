import { UserModel } from "../models/Users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
   
    
    if(!user) {
       return res.json({"massage": "user dosnt exists"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({"massage": "wrong cradintials"});
    }

    const token = jwt.sign({id: user._id}, "secret");

    res.status(200).json({ token, userID: user._id }).end();
}

export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
    
    if (user) {
        return res.json({message: "user already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json(newUser).end();
}