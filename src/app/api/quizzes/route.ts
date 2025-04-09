import { connectDB } from "@/lib/db";
import { Quiz } from "@/models/quiz";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await connectDB()
    const body = await req.json()

    if(!body.title || !body.question?.length)
    {
        return NextResponse.json({message:"Thiếu Dữ Liệu"},{status:400})
    }
    const newQuiz = await Quiz.create(body);
    return NextResponse.json(newQuiz);
}