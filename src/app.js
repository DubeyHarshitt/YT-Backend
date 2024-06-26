import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configuring CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "16kb"}));  // json format me data lene k liye
app.use(express.urlencoded({extended: true, limit: "16kb"})); //  Url se data lene k liye
app.use(express.static("public")); // stored pdf's img's use krne k liye (ASSETS)
// app.use(express.cookieParser()); // cookie parser use krne k liye
app.use(cookieParser());



// Routes Import
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register



export  {app} 