import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCludinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res)=>{
    
    // get user detail from frontend
    // enter validation - not empty
    // check if user already existes - email, username
    // check for images & avtars
    // upload them to cloudinary - avtars
    // create user object - create entry in DB 
    // remove password and refresh token from response
    // check user creation 
    // return res


    const {userName, email, fullName, password } = req.body;   // get user detail from frontend

    if(
        [userName, email, fullName, password ].some((field)=>field?.trim()=== "")   // enter validation - not empty
    ){
        throw new ApiError(400, "All fields is required")  
    }

    const existedUser = User.findOne({
        $or: [ {userName}, {email} ]
    })
    if(existedUser){
        throw new ApiError(409, "User with username or email already exists")  // check if user already existes - email, username
    }

    // check for images & avtars
    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(400, "Avtar file is required");
    }

        // upload them to cloudinary - avtars
        const avtar = await uploadOnCludinary(avtarLocalPath);
        const coverImage = await uploadOnCludinary(coverImageLocalPath);
        if(!avtar){
            throw new ApiError(400, "Avtar file is required" );
        }

        // create user object - create entry in DB 
        const user = await User.create({
            fullName,
            avtar: avtar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            userName: userName.toLowerCase(),
        })

        // remove password and refresh token from response
        // check user creation 
        const createdUser = await User.findById(user._id).select( "-password -refreshToken" );
        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering User");
        }

        // return res
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User Registered Sucessfullly")
        )
} )

export {registerUser};