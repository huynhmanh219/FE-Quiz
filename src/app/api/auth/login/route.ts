import { connectDB } from "@/lib/db"
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";



export async function POST(req:Request){
    await connectDB()
    const {email,password} = await req.json();

    const user = await User.findOne({email})
    if(!user){return NextResponse.json({error:"Không tìm thấy email"},{status:401}) }
    
    const isMath = await bcrypt.compare(password,user.password)
    if(!isMath) return NextResponse.json({error:"Mật khẩu không đúng"},{status:403})
    
    const payload = {userId:user._id,role:user.role}
    
    const accessToken = generateAccessToken(payload);
    
    const refreshToken = generateRefreshToken(payload);
    
    const response = NextResponse.json({success:true,accessToken,refreshToken})
    
    user.refreshToken = refreshToken
    await user.save();

    response.cookies.set("accessToken",accessToken,{
        httpOnly:true,
        maxAge:15*60,
        path:"/"})
    
    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, 
        path: "/",
      });
    

    return response
}