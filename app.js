import express from "express";
import "dotenv/config";

const app = express();


const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server running on port : ${port}`);
})
