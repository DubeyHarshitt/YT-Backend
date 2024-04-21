// const dotenv = require('dotenv').config({path:'.env'})
import dotenv from "dotenv";
import connectDb from "./db/index.js";

// For using this we've to change dev from pacakge.json -r dotenv/config --experimental-json-modules
dotenv.config({
    path:'./env'
});

connectDb();