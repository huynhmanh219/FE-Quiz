import mongoose from "mongoose"

const mongo_url = process.env.MONGODB_URL as string
export async function connectDB(){
    if(mongoose.connection.readyState >= 1) return;
    return mongoose.connect(mongo_url)
}