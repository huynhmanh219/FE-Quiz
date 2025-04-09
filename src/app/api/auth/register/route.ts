import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"



export async function POST(req:Request){
    await connectDB()
    const {email,password,name,role = "client"} = await req.json();
    const existingUser = await User.findOne({email:email})
    console.log(existingUser);
    
    if(existingUser) return NextResponse.json({error:"Email đã tồn tại"},{status:400});

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({email,password:hashedPassword,name,role});

    return NextResponse.json({message:"Đăng ký thành công",user:{email:newUser.email,name:newUser.name},success:true})
    
}