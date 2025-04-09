'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import QuestionItemEditor from './_components/question-item-editor'
import { log } from "console";

type Question = {
    id:number
    text:string
    options:string[]
    correctAnswer:number
}


export default function CreateQuizPage(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState("")
    const [duration,setDuration] = useState(60)
    const [questions,setQuestions] = useState<Question[]>([])

    const addQuestion = ()=>{
        setQuestions(prev =>[
            ...prev,
            {
            id:Date.now(),
            text:"",
            options:['','','',''],
            correctAnswer:0
        }
    ])
    }

    const updateQuestion = (index: number, updated: any) => {
        const newQuestions = [...questions]
        newQuestions[index] = updated
        setQuestions(newQuestions)
    }

    
  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)
  }


    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log({title,description,duration,questions});
        //call api
    }
    return(
        <main className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Tạo đề thi mới</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label>Tiêu đề</Label>
                            <Input value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <Label>Mô tả</Label>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div>
                            <Label>Thời gian làm bài (phút)</Label>
                            <Input type="number" value={duration} onChange={(e) => setDuration(+e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Câu hỏi</Label>
                            {questions.map((q,index)=>(
                                <QuestionItemEditor 
                                key={q.id}
                                index={index}
                                question={q}
                                onChange={(updated)=>updateQuestion(index,updated)}
                                onRemove={()=>removeQuestion(index)}
                                >
                                </QuestionItemEditor>
                            ))}
                            <Button type="button" variant="outline" onClick={addQuestion}>
                                <Plus className="w-4 h-4 mr-2"></Plus>Thêm câu hỏi
                            </Button>
                        </div>
                        <Button type="submit">Tạo đề thi</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}