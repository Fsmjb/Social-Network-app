import { userModel } from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hash = await bcrypt.hash(password, 10);
        const createUser = new userModel({
            name,
            email,
            password: hash
        });

        await createUser.save();

        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, {
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
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "invilad email or password" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "invilad email or password" })
        }

        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
            path: "/",
        });
        return res.redirect("/");
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    userRegister,
    userLogin
}