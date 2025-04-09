import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string


const PROTECTED_PATHS = ["/dashboard","/quiz/create"];

export function middleware(req:NextRequest){
    const token = req.cookies.get("accessToken")?.value || req.headers.get("Authorization")?.split(" ")[1]

    if(PROTECTED_PATHS.some(path => req.nextUrl.pathname.startsWith(path))){
        if(!token) return NextResponse.redirect(new URL("/login",req.url))

        try {
            const decoded:any = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!);
            if (req.nextUrl.pathname.startsWith("/quiz/create") ||req.nextUrl.pathname.startsWith("/admin")) {
                if (decoded.role !== "admin") {
                  return NextResponse.redirect(new URL("/unauthorized", req.url));
                }
              }
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/login",req.url))
        }
    }
}

export const config = {
    matcher:[
        "/quiz/create",
        "/dashboard/:path*",
        "/admin/:path*"
    ]
}
