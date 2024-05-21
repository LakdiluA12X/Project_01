import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
    console.log("Database is connecting...")
    console.log(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}${process.env.CLUSTER}`)
    const dbConnection = await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}${process.env.CLUSTER}`);
    console.log(`Databse Connection ${dbConnection}.`);
    return dbConnection;
}

export default connect;