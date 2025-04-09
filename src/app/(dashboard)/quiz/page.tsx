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
        <main className="p-3 space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Danh sách đề thi</h1>
                <Link href="/quiz/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tạo đề thi mới
                    </Button>
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="w-full flex max-w-[420px] mx-auto shadow-sm">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg line-clamp-1 ">{quiz.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-1.5 ">
                            <div className="flex flex-col flex justify-baseline items-start flex-wrap  gap-1 text-lg">
                                <p className="text-muted-foreground text-sm line-clamp-2">{quiz.description}</p>
                                <span>⏱ Thời gian: {quiz.duration} phút</span>
                                <span>❓ Số câu hỏi: {quiz.questionsCount}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-3">
                                <Link href={`/quiz/${quiz.id}`}>
                                    <Button variant="outline" size="sm" className="text-xs h-8">Xem</Button>
                                </Link>
                                <Link href={`/quiz/edit/${quiz.id}`}>
                                    <Button variant="outline" size="sm" className="text-xs h-8">Sửa</Button>
                                </Link>
                                <Link href={`quiz/${quiz.id}/take`}>
                                    <Button variant="default" size="sm" className="text-xs h-8">Làm bài thi</Button>
                                </Link>
                                <Button variant="destructive" size="sm" className="text-xs h-8">Xóa</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}