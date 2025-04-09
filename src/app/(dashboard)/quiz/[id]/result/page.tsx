"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"




type Question = {
    _id:string
    text:string
    options:string[]
    correctAnswer:number
}

type QuizResult = {
    title:string
    questions:Question[]
    userAnswers:{[questionId:string]:number}
}

const fakeData:QuizResult={
    title: "Đề thi thử IELTS Listening",
    questions: [
    {
      _id: "q1",
      text: "Câu hỏi 1 là gì?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 1,
    },
    {
      _id: "q2",
      text: "Câu hỏi 2 là gì?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 2,
    },
  ],
  userAnswers: {
    q1: 1,
    q2: 0,
  },
}

export default function QuizResultPage(){
    const total = fakeData.questions.length
    const correct = fakeData.questions.reduce((sum,q)=>{
        const userAnswer = fakeData.userAnswers[q._id]
        return userAnswer === q.correctAnswer ? sum + 1 : sum
    },0)
    return(
        <main className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Kết quả bài làm: {fakeData.title}</CardTitle>
                    <p className="text-muted-foreground">Bạn đúng {correct}/{total} câu — Điểm: {((correct / total) * 10).toFixed(1)} / 10</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {fakeData.questions.map((q,index)=>{
                        const userAnswer = fakeData.userAnswers[q._id]
                        return(
                            <>
                                <div key={q._id} className="p-4 border rounded-md space-y-2">
                                    <p className="font-medium">{index+1}.{q.text}</p>
                                    <ul className="list-none space-y-1">
                                        {q.options.map((opt,i)=>{
                                            const isCorrect = i === q.correctAnswer
                                            const isUser = i === userAnswer

                                            let className = "px-3 py-1 rounded"
                                            if(isCorrect) className += "bg-green-600 text-green-700 font-semibold"
                                            if(isUser && !isCorrect) className+="bg-red-100 text-red-700"
                                            return(
                                                <li key={i} className={className}>
                                                      {opt} {isCorrect ? "✓" : ""} {isUser && !isCorrect ? "✗" : ""}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </>
                        )
                    })}
                    <Button onClick={()=>window.location.href="/"}>Quay lại trang chủ</Button>
                </CardContent>
            </Card>
        </main>
    )
}
