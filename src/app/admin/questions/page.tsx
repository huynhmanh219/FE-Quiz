// app/admin/questions/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table'
import axios from 'axios'

interface Question {
  _id: string
  content: string
  type: string
  level: string
  options: { label: string; value: string; isCorrect: boolean }[]
}

export default function AdminQuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('http://localhost:3000/api/questions')
      console.log(res.data);
      
      setQuestions(res.data.questions)
    }

    fetchQuestions()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📚 Danh sách câu hỏi</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Câu hỏi</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Độ khó</TableHead>
                <TableHead>Tuỳ chọn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q) => (
                <TableRow key={q._id}>
                  <TableCell>{q.content}</TableCell>
                  <TableCell>{q.type}</TableCell>
                  <TableCell>{q.level}</TableCell>
                  <TableCell>
                    <ul className="list-disc ml-4">
                      {q.options.map((opt, idx) => (
                        <li key={idx}>
                          {opt.label}: {opt.value} {opt.isCorrect ? '✅' : ''}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
