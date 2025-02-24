import { userModel } from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postModle } from "../model/postModel.js";


const userRegister = async (req, res) => {
    try {
        const { name, email, password, username, about } = req.body;
        if (!name || !email || !password || !username || !about) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hash = await bcrypt.hash(password, 10);
        const createUser = new userModel({
            name,
            username,
            about,
            email,
            password: hash
        });

        await createUser.save();

        const token = jwt.sign({ user: username }, process.env.JWT_SECRET, {
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
};

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

        const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
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
};

const user = async (req, res) => {
    try {
        const user = req.params.user;
        const user1 = req.user.user;
        let status = "Follow";

        const data = await userModel.findOne({ username: user });
        const data2 = await userModel.findOne({ username: user1 });
        const post = await postModle.find({user : user});

        if (user == user1) {
            return res.redirect("/profile");
        }
        if (!data) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if(data.followers.includes(data2._id)){
            status = "UnFollow";
        }
        return res.render("user", { data: data, follow : status, post : post, user : user1});

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const createPost = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const profile = async (req, res) => {
    try {
        const user = req.user.user;
        const user1 = req.user.user;
        const data = await userModel.findOne({ username: user });
        const post = await postModle.find({user : user});
        
        if (!data) {
            return res.status(400).json({ message: "User does not exist" });
        }
        return res.render("profile", { data: data, post : post, user : user1 });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("token", "");
        res.redirect("/login");
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const follow = async (req, res) => {
    try {
        const userToFollow = req.params.user;
        const user1 = req.user.user;

        const userToFollowDoc = await userModel.findOne({ username: userToFollow });
        if (!userToFollowDoc) {
            return res.status(400).json({ message: "User to follow does not exist" });
        }

        const currentUserDoc = await userModel.findOne({ username: user1 });
        if (!currentUserDoc) {
            return res.status(400).json({ message: "Current user does not exist" });
        }

        if (currentUserDoc.following.includes(userToFollowDoc._id)) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        
        if(userToFollowDoc.followers.includes(currentUserDoc._id)){
            return res.status(400).json({ message: "You are already following this user" });
        }

        currentUserDoc.following.push(userToFollowDoc._id);
        await currentUserDoc.save();

        userToFollowDoc.followers.push(currentUserDoc._id);
        await userToFollowDoc.save();

        return res.redirect(`/user/${userToFollow}`);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const unfollow = async (req, res) => {
    try {
        const userToFollow = req.params.user;
        const user1 = req.user.user;

        const userToFollowDoc = await userModel.findOne({ username: userToFollow });
        if (!userToFollowDoc) {
            return res.status(400).json({ message: "User to follow does not exist" });
        }

        const currentUserDoc = await userModel.findOne({ username: user1 });
        if (!currentUserDoc) {
            return res.status(400).json({ message: "Current user does not exist" });
        }

        if (!currentUserDoc.following.includes(userToFollowDoc._id)) {
            return res.status(400).json({ message: "You to follow does not exist" });
        }

        
        if(!userToFollowDoc.followers.includes(currentUserDoc._id)){
            return res.status(400).json({ message: "Current user does not exist" });
        }

        currentUserDoc.following.pull(userToFollowDoc._id);
        await currentUserDoc.save();

        userToFollowDoc.followers.pull(currentUserDoc._id);
        await userToFollowDoc.save();

        return res.redirect(`/user/${userToFollow}`);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export {
    userRegister,
    userLogin,
    user,
    profile,
    logout,
    follow,
    unfollow
}