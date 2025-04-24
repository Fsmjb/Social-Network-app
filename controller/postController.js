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


const likePost = async (req, res) => {
    try {
        const postToLike = req.params.id;
        const user = req.user.user;
        const user1 = req.params.user;

        const userToLikeDoc = await postModle.findOne({ _id: postToLike});
        if(!userToLikeDoc){
            return res.status(400).json({message :"The post you want to like does not exist"});
        }
        if(userToLikeDoc.likes.includes(user)){
            return res.status(400).json({message :"you already like the post"});
        }
        userToLikeDoc.likes.push(user);
        await userToLikeDoc.save();

        return res.redirect(`/user/${user1}#${postToLike}`);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



const unLikePost = async (req, res) => {
    try {
        const postToUnlike = req.params.id;
        const user = req.user.user;
        const user1 = req.params.user;

        const postToLike = await postModle.findOne({ _id: postToUnlike });
        if (!postToLike) {
            return res.status(400).json({ message: "The post you want to unlike does not exist" });
        }
        if (!postToLike.likes.includes(user)) {
            return res.status(400).json({ message: "You have not liked this post" });
        }

        postToLike.likes.pull(user);
        await postToLike.save();

        return res.redirect(`/user/${user1}#${postToLike}`);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const comment = async(req, res)=>{
    try{
        const commentID = req.params.id;
        const user = req.user.user;
        const user1 = req.params.user;
        const {body} = req.body;

        const postToComment = await postModle.findOne({ _id: commentID});
       
        if (!postToComment.comments) {
            postToComment.comments = [];
        }
        postToComment.comments.push( {
            body : body,
            user : user
        });
        await postToComment.save();
        return res.redirect(`/user/${user1}#${commentID}`);
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
newPost,
likePost,
unLikePost,
comment
}