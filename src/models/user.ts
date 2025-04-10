import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String},
    name:{type:String},
    role:{type:String,enum:["admin","client"],default:"client"},
    refreshToken:{type:String,default:""},
    confirmPassword:{type:String}
})

export const User = mongoose.models.User || mongoose.model("User",userSchema)