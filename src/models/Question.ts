import mongoose, { models, Schema } from "mongoose";


const questionSchema = new mongoose.Schema({
    content: {type:String,required:true},
    Option: [
        {
            label:String,
            value:String,
            isCorrect:Boolean
        }
    ],
    type:{type:String,enum:["single","multiple"],default:"single"},
    level:{type:String,enum:["easy","medium","hard"],default:"medium"},
    tags:[String],
    createdBy:{type:Schema.Types.ObjectId,ref:"User"}
},
{timestamps:true}
)

export const Question =  mongoose.models.Question || mongoose.model("Question",questionSchema);