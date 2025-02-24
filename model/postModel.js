import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user : {
        type :String,
        required : true
    },
    body: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        default: ""
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
    comments: [{
        body: {
            type: String,
            required: true, // Comment body (text) is required
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', // User who commented
            required: true, // A user must be linked to the comment
        },
        createdAt: {
            type: Date,
            default: Date.now, // Timestamp for when the comment was made
        }
    }],

}, { timestamps : true});

const postModle = mongoose.model("post", postSchema);

export { postModle };
