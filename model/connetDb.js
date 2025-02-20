import mongoose from "mongoose";

const connect  = async () =>{
    try{
        await  mongoose.connect(process.env.MONGODB);
        console.log("database connected");
    }
    catch(err){
        console.log("Error in database", err);
    }
};

export default connect;