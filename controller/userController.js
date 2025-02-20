import { userModel } from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRegister = async(req, res) =>{
try{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    const hash = await bcrypt.hash(password, 10);
    const createUser = new userModel({
        name,
        email,
        password : hash
    });
    
    await createUser.save();
    
    const token = jwt.sign({ id: email}, process.env.JWT_SECRET, {
        expiresIn: "1h", 
    });
      
    res.cookie("token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "Strict", 
    maxAge: 3600000, 
    path: "/", 
    });
      
    res.redirect("/");
}

catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
}
}

export {
    userRegister
}