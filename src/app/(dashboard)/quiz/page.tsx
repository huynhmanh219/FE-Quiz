'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"





type Quiz = {
    id:string
    title:string
    description:string
    duration:number
    questionsCount:number
}

export default function QuizListPage(){
    const [quizzes,setQuizzes] = useState<Quiz[]>([]);

    useEffect(()=>{
        const data:Quiz[] = [
            {
              id: "1",
              title: "Đề thi thử TOEIC 2025",
              description: "Đề thi thử full 200 câu sát đề thật",
              duration: 120,
              questionsCount: 200,
            },
            {
              id: "2",
              title: "Đề kiểm tra kiến thức lập trình",
              description: "Dành cho sinh viên ngành CNTT",
              duration: 60,
              questionsCount: 30,
            },
          ]
          setQuizzes(data)
    },[])
    return(
        <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Danh sách đề thi</h1>
                <Link href="/quiz/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2"></Plus>
                        Tạo đề thi mới
                    </Button>
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.map((quiz)=>(
                    <Card key={quiz.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-muted-foreground text-sm">{quiz.description}</p>
                            <div className="text-sm">⏱ Thời gian: {quiz.duration} phút</div>
                            <div className="text-sm">❓ Số câu hỏi: {quiz.questionsCount}</div>
                            <div className="flex gap-2 pt-2">
                                <Link href={`/quiz/${quiz.id}`}>
                                    <Button variant="outline" size="sm">Xem</Button>
                                </Link>
                                <Link href={`/quiz/edit/${quiz.id}`}>
                                    <Button variant="outline" size="sm">Sửa</Button>
                                </Link>
                                <Button variant="destructive" size="sm">Xoá</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


        </main>
    )
}