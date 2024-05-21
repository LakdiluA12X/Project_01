import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: String,
    role: String,
    credits: Number
});

const user = model("users", userSchema);
export default user