import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must be less than 100 characters"]
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "unique email is required"],
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must be less than 100 characters"]
    },
    password : {
        type: String,
        required: [true, "Password is required"],
    }
});


const userModel = mongoose.model("user", userSchema);

export {
    userModel
};
