import { Router } from "express";
import { userRegister, userLogin } from "../controller/userController.js";
import verifyJwt from "../middleware/jwtVerify.js";

const router = Router();


router.get("/", verifyJwt, (req, res) =>{
    res.send("Hello world");
});


router.get("/reg", (req, res)=>{
    res.render("register");
});

router.post("/reg/submit", userRegister);


router.get("/login", (req, res) =>{
    res.render("login");
})

router.post("/login/submit", userLogin);

export default router;