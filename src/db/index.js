import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDb = async () => {
    // mongoose.connect('mongodb://localhost:27017/myDatabase')
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('\n Mongo DB Connection FAILED \n \n', error);
        process.exit(1);
    }
}

export default connectDb;