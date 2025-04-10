import { connectDB } from '@/lib/db'
import { Question } from '@/models/question'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/utils/jwt' 
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
  await connectDB()

  const token = req.cookies.get('accessToken')?.value
  if (!token) return NextResponse.json({ message: 'Mời bạn đăng nhập' }, { status: 401 })

  const user = verifyAccessToken(token)
  console.log("Token:", token)
  console.log("User:", user)
  if (!user) {
    return NextResponse.json({ message: 'Bạn chưa đủ quyền' }, { status: 401 })
  }



  const { content, options, type, level } = await req.json()
  const body = await req.json()
  console.log("Received body:", body)
  if (!content || !Array.isArray(options)) {
    return NextResponse.json({ message: 'Nội dung không hợp lệ' }, { status: 400 })
  }


  try {
    const newQuestion = await Question.create({
      content,
      options,
      type,
      level,
      createdBy: new mongoose.Types.ObjectId(user._id),
    })

    return NextResponse.json({ message: 'Created', question: newQuestion })
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function GET(req:NextRequest){
  await connectDB()
  const token = req.cookies.get('accessToken')?.value
  if(!token) return NextResponse.json({message:"Mời bạn đăng nhập"},{status:401})

  const user = verifyAccessToken(token);
  console.log(user);
  
  if(!user || user.role === "admin" ){
    return NextResponse.json({message:"Bạn không đủ quyền hạng"},{status:401})
  }
  try {
    const question = await Question.find({createdBy:user._id})
    return NextResponse.json({question})
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi ở server' }, { status: 500 })
  }
}