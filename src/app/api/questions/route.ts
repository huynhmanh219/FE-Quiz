import { connectDB } from "@/lib/db";
import { Question } from "@/models/question";
import { NextResponse } from "next/server";


new Promise(async (resolve,reject)=>{
    await resolve(connectDB())
})

export async function GET(){
    const question = await Question.find();
    return NextResponse.json(question);
}