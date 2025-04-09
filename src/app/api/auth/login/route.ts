import { connectDB } from "@/lib/db"
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export async function POST(req:Request){
    await connectDB()
    const {email,password} = await req.json();

    const user = await User.findOne({email})
    if(!user){return NextResponse.json({error:"Không tìm thấy email"},{status:401}) }
    
    const hashedPassword = await bcrypt.hash(password,10);
    const isMath = await bcrypt.compare(hashedPassword,user.password)
    if(!isMath) return NextResponse.json({error:"Mật khẩu không đúng"},{status:401})
    
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