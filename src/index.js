// const dotenv = require('dotenv').config({path:'.env'})
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import {app} from "./app.js"

// For using this we've to change dev from pacakge.json -r dotenv/config --experimental-json-modules
dotenv.config({
    path:'./env'
});

connectDb()
.then( ()=>{
    // app.on("error", (error)=>{
    //     console.log('\n Errr', error);
    // });

    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is Running on Port ${process.env.PORT}`);
    });
} )
.catch( (err)=>{
    console.log('\n MongoDB Connection Error', err);
} );