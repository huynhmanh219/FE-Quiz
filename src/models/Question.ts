import mongoose, { models, Schema } from "mongoose";


const questionSchema = new mongoose.Schema({
    content: String,
    Option: {type:[String]},
    correctAnswer:Number,
},
{timestamps:true}
)

export const Question =  mongoose.models.Question || mongoose.model("Question",questionSchema);