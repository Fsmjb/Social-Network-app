import { Router } from "express";
import { userRegister, userLogin } from "../controller/userController.js";
import verifyJwt from "../middleware/jwtVerify.js";
import { user, profile } from "../controller/userController.js";
import { logout, follow } from "../controller/userController.js";
import { unfollow } from "../controller/userController.js";
import upload from "../middleware/multer.js";
// post import

import { newPost, likePost } from "../controller/postController.js";
import {  unLikePost, comment } from "../controller/postController.js";

const router = Router();


router.get("/", verifyJwt, (req, res) =>{
    try{
      res.send("This is home page")
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/user/:user",verifyJwt, user);


router.get("/reg", (req, res)=>{
    res.render("register");
});

router.post("/reg/submit", userRegister);


router.get("/login", (req, res) =>{
    res.render("login");
})

router.get("/logout", logout);
router.post("/login/submit", userLogin);

// router.get("/user/post/", )
router.get("/profile",verifyJwt, profile);

router.get("/user/:user/follow", verifyJwt, follow );
router.get("/user/:user/unfollow", verifyJwt,   unfollow );


// post router 

router.post("/post/new", verifyJwt, upload.single("image"), newPost);
router.get("/post/like/:user/:id", verifyJwt, likePost);
router.get("/post/unlike/:user/:id", verifyJwt, unLikePost);


router.post("/post/comment/:user/:id", verifyJwt, comment);


export default router;