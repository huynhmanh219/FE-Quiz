import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Quiz = {
    title:string
    description:string
    duration:number
    questions:{
        text:string
        options:string[]
        correctAnswer:number
    }[]
}


// dữ liệu mẫu sau này sẽ fetch từ BE (fetch dữ liệu từ api theo params.id)
const quizSample:Quiz = {
    title: "Đề kiểm tra số 1",
    description: "Đề thi thử THPT Quốc Gia",
    duration: 60,
    questions: [
      {
        text: "Thủ đô của Việt Nam là?",
        options: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế"],
        correctAnswer: 0,
      },
      {
        text: "2 + 2 bằng bao nhiêu?",
        options: ["3", "4", "5", "22"],
        correctAnswer: 1,
      },
    ],
}

export default function QuizDetailPage(){
    const quiz = quizSample
    return(
        <main className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{quiz.description}</p>
                    <p className="font-semibold">Thời gian: {quiz.duration} phút</p>

                    <div className="space-y-4 mt-6">
                        {quiz.questions.map((q,index)=>(
                            <div key={index} className="p-4 border rounded-md space-y-2">
                                <p className="font-medium">{index + 1}.{q.text}</p>
                                <ul className="list-disc pl-6">
                                    {q.options.map((opt,i)=>(
                                        <li key={i} className={i === q.correctAnswer ? "font-semibold text-green-600" : ""}>
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}