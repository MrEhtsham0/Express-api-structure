import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 8,
    }
},{ timestamps: true,}
);

export const User = mongoose.model("User", userSchema);