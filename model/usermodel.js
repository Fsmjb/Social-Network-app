import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [100, "Name must be less than 100 characters"]
    },
    username: {
        type : String,
        unique : [true, "username must be unique"]
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email must be unique"],
        minlength: [3, "Email must be at least 3 characters long"],
        maxlength: [100, "Email must be less than 100 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    about : {
        type: String,
        default : "i am a good boy"
    },
    imgUrl : {
        type: String,
        default: "db.png"
    }
    ,
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user", // This references the same user model
        default: [],
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user", // This also references the same user model
        default: [],
    }
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
