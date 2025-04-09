import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title:{type:String,required:true},
    duration:Number,
    description:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
{
    timestamps:true
}
);

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz",quizSchema);