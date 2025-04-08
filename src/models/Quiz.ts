import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title:String,
    duration:Number,
    description:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]
},
{
    timestamps:true
}
);

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz",quizSchema);