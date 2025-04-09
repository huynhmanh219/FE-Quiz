"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { title } from "process"
import { useEffect, useState } from "react"

type Question = {
    _id:string
    text:string
    options:string[]
}

type Quiz = {
    _id:string
    title:string
    description:string
    duration:number
    questions:Question[]
}

export default function QuizTakingPage(){
    const {quizId} = useParams();
    const [quiz,setQuiz] = useState<Quiz| null>(null)
    const [answers,setAnswers] = useState<{ [questionId : string] : number }>({})
    const [timeLeft,setTimeLeft] = useState(0)

    //Fake api call, sau này có thể thay bằng fetch(`/api/quiz/${quizId}`)
    useEffect(()=>{
        const fakeQuiz:Quiz = {
            _id: "1",
            title: "Đề thi thử IELTS Listening",
            description: "Luyện tập kỹ năng nghe tiếng Anh.",
            duration: 5, // phút
            questions: [
              {
                _id: "q1",
                text: "Câu hỏi số 1 là gì?",
                options: ["A", "B", "C", "D"],
              },
              {
                _id: "q2",
                text: "Câu hỏi số 2 là gì?",
                options: ["A", "B", "C", "D"],
              },
            ],
          }
          setQuiz(fakeQuiz)
          setTimeLeft(fakeQuiz.duration*60)// giây
    },[quizId])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimeLeft((prev)=>{
                if(prev< 1)
                {
                    clearInterval(interval)
                    handleSubmit()
                    return 0
                }
                return prev-1;
            })
        },1000)
        return ()=>clearInterval(interval)
    },[quiz])

    const handleSelect = (questionId:string, optionIndex:number)=>{
        setAnswers((prev)=>({...prev,[questionId]:optionIndex}))
    }

    const handleSubmit = ()=>{
        // goi api 
        console.log("Đáp án của người dùng là :",answers);
        alert("bài thi đã được nộp");
    }

    const formartTime = (sec:number)=>{
        const m = Math.floor(sec/60)
        const s = sec % 60
        return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,"0")}`
    }

    if(!quiz) return <p>Đang tải đề thi...</p>
    
    return(
        <main className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {quiz.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{quiz.description}</p>
                    <p className="text-red-500 font-bold">⏱ Thời gian còn lại:{formartTime(timeLeft)}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {quiz.questions.map((q,index)=>(
                        <div key={q._id}>
                            <p className="font-medium">{index+ 1}.{q.text}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {q.options.map((opt,optIndex)=>(
                                    <Label key={optIndex} className="flex items-center gap-2">
                                        <Input type="radio" 
                                            name={q._id}
                                            value={optIndex}
                                            checked={answers[q._id] === optIndex}
                                            onChange={()=> handleSelect(q._id,optIndex)}
                                        />
                                        {opt}
                                    </Label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Button onClick={handleSubmit}>Nộp Bài</Button>
                </CardContent>
            </Card>
        </main>
    )
}