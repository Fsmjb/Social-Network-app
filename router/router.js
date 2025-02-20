import { Router } from "express";
import { userRegister } from "../controller/userController.js";
import verifyJwt from "../middleware/jwtVerify.js";

const router = Router();


router.get("/", verifyJwt, (req, res) =>{
    res.send("Hello world");
})


router.get("/reg", (req, res)=>{
    res.render("register");
})

router.post("/reg/submit", userRegister);

export default router;