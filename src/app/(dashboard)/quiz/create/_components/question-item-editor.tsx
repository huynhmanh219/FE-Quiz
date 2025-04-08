'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash } from "lucide-react"

interface Question{
    id:number
    text:string
    options:string[]
    correctAnswer:number
}

interface Props{
    index:number
    question:Question
    onChange:(update:Question)=>void
    onRemove:()=>void
}

export default function QuestionItemEditor({index,question,onChange,onRemove}:Props){
    const updateText = (value:string)=>{
        onChange({...question,text:value})
    }

    const updateOption = (value:string,i:number)=>{
        const newOptions = [...question.options]
        newOptions[i] = value
        onChange({...question,options:newOptions})
    }
    const setCorrect = (i:number)=>{
        onChange({...question,correctAnswer:i})
    }
    
    return (
        <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between">
                <Label className="text-lg">Câu hỏi {index + 1}</Label>
                <Button 
                type="button"
                size="icon"
                variant="ghost"
                onClick={onRemove}
                >
                <Trash className="w-5 h-5 text-destructive"></Trash>
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Nội dung câu hỏi</Label>
                    <Input
                    value={question.text}
                    onChange={(e)=>updateText(e.target.value)}
                    >
                    </Input>
                </div>
                <div className="space-y-2">
                    {question.options.map((opt,i)=>(
                        <div key={i} className="flex items-center gap-2">
                            <Input
                            value={opt}
                            placeholder={`Đáp án ${String.fromCharCode(65+i)}`}
                            onChange={(e)=> updateOption(e.target.value,i)}
                            >
                            </Input>
                            <Input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked= {question.correctAnswer === i}
                                onChange={()=> setCorrect(i)}
                            >
                            </Input>
                            <span className="text-sm">Đúng</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}