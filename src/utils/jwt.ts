import { JwtUserPayload } from "@/types/jwt";
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET as string
const REFRESH_EXPIRES_IN = "7d"; // Giữ nguyên
const ACCESS_EXPIRES_IN = "15m"; // 15 phút

export function generateAccessToken(payload:JwtUserPayload){
    return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_EXPIRES_IN})
}

export function generateRefreshToken(payload:JwtUserPayload){
    return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_EXPIRES_IN})
}

export function verifyAccessToken(token:string){
    return jwt.verify(token,ACCESS_TOKEN_SECRET) as JwtUserPayload
}
export function verifyRefreshToken(token:string){
    return jwt.verify(token,REFRESH_TOKEN_SECRET) as JwtUserPayload
}