import express from "express";
import "dotenv/config";
import router from "./router/router.js";
import connect from "./model/connetDb.js";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());



app.use("/" ,router);

connect();

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server running on port : ${port}`);
})
