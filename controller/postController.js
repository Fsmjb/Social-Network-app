import { postModle } from "../model/postModel.js";

const newPost = async(req , res)=>{
try{
    const user = req.user.user;
    const {text} = req.body;
    let filename = "";
    if(req.file){
        filename = req.file.filename;
    }

    const createPost = new postModle({
        user : user,
        body: text,
        imgUrl : filename
    });

    await createPost.save();

    return res.redirect("/profile");
}
catch(err){
    return res.status(500).json({ message: "Internal Server Error " });
}
};

export {
newPost
}