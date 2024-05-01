import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);


// pre hook ek method hai , jo data save hone k just pahale kuch bhi code run krva skte hai
// "save" , k jagha pe jab code run krvna ho woh likhte hai eg :- on save, update, remove, updateOne, deleteOne,

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // Agar password change nai hua h toh direct next kardo

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

// Password compare krne k liye method banaye
userSchema.methods.isPasswordCorrect = async function 
(password) {
    return await bcrypt.compare(password ,this.password)
};

// JWT Acess token generate
userSchema.methods.generateAcessToken = function (){
    // jwt.sign used to generate token 
    // syntax => const token = jwt.sign(payload, secretKey, options);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName 
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: this.process.env.ACESS_TOKEN_EXPIRY
        }
    )
};

// Synatx :- const token = jwt.sign(payload, secretKey, options);
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        // Payload
        {
            _id: this._id,
        },
        // Secret Key
        process.env.REFRESH_TOKEN_SECRET, 
        // Expiry
        {
            expiresIn: this.process.env.REFRESH_TOKEN_EXPIRY
        },
    )
}

export const User = mongoose.model("User", userSchema);
