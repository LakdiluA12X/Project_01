import mongoose, { Schema, Model } from "mongoose";
import { Project } from "../interfaces/int";

const projectSchema: Schema<Project> = new Schema({
    company: String,
    country: String,
    state: String,
    credits: Number,
});

const projectModel: Model<Project> = mongoose.model("Projects", projectSchema);
export default projectModel;