import mongoose, { Schema, Document, Model } from "mongoose";
import { User } from "../interfaces/int";

const userSchema: Schema<User> = new Schema({
    name: String,
    role: String,
    credits: Number
});

const user: Model<User> = mongoose.model("users", userSchema);
export default user