// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         match: /.+\@.+\..+/
//     },
//     password:{
//         type: String,
//         required: [true, "Password is required"],
//         trim: true,
//         minlength: 8,
//     }
// },{ timestamps: true,}
// );

// export const User = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// in pre-save hook DOnt write callbacks by arrow functions
// ("save",()={})=>DOnt use this because arrow functions do not have their own 'this' context
userSchema.pre("save", async function (next) {
  // If password is modified than hash otherwise skip
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// gENERATE JWT TOKEN
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
};
// gENERATE REFRESH TOKEN
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );
};
export const User = mongoose.model("User", userSchema);
