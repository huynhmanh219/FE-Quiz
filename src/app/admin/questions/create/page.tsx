'use client'

import CreateQuestionForm from '@/components/question/CreateQuestionForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateQuestionPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Tạo câu hỏi mới</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateQuestionForm />
        </CardContent>
      </Card>
    </div>
  )
}
