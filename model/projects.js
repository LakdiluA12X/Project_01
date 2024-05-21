import mongoose from "mongoose";
const {Schema, model} = mongoose;

const projectSchema = new Schema({
    company: String,
    country: String,
    state: String,
    credits: Number,
});

const projectModel = model("Projects", projectSchema);
export default projectModel;