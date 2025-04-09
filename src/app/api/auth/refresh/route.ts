import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req:Request){
    await connectDB();
    const {refreshToken} = await req.json();
    if(!refreshToken)
    {
        return NextResponse.json({message:"Không có refresh token"},{status:401})
    }
    try
    {
        const decoded: any = jwt.decode(refreshToken);
        const payload = verifyRefreshToken(refreshToken) as any
        const user = await User.findById(payload.userId)
        if(!user || user.refreshToken ! === refreshToken)
            return NextResponse.json({message:"Refresh token không hợp lệ"},{status:403})

        const currentTime = Math.floor(Date.now()/1000)
        const timeLeft = decoded.exp - currentTime

        const newRefreshToken = jwt.sign({userId:user._id,role:user.role},process.env.REFRESH_TOKEN_SECRET as string,{expiresIn:timeLeft})
        user.refreshToken = newRefreshToken
        await user.save()

        const newAccessToken = generateAccessToken({userId:user._id,role:user.role})
        return NextResponse.json({accessToken:newAccessToken,refreshToken:newRefreshToken})
    }
    catch(error){
        return NextResponse.json({message:"Lỗi refresh token"},{status:403})
    }
}