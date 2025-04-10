'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import axios from 'axios'

export default function CreateQuestionForm() {
  const [content, setContent] = useState('')
  const [options, setOptions] = useState([
    { label: 'A', value: '', isCorrect: false },
    { label: 'B', value: '', isCorrect: false },
    { label: 'C', value: '', isCorrect: false },
    { label: 'D', value: '', isCorrect: false },
  ])
  const [level, setLevel] = useState('easy')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('http://localhost:3000/api/questions', {
        content,
        options,
        type: 'single',
        level,
      },{
        withCredentials:true
      })
      console.log( content,
        options,
        level,);

      toast.success('Tạo câu hỏi thành công!')
      setContent('')
      setOptions(options.map(o => ({ ...o, value: '', isCorrect: false })))
    } catch (err) {
        toast.error("lỗi")
    } finally {
      setLoading(false)
    }
  }

  const toggleCorrect = (index: number) => {
    setOptions(options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    })))
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Nhập nội dung câu hỏi..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      {options.map((opt, index) => (
        <div key={opt.label} className="flex items-center gap-2">
          <Input
            placeholder={`Đáp án ${opt.label}`}
            value={opt.value}
            onChange={e => {
              const newOptions = [...options]
              newOptions[index].value = e.target.value
              setOptions(newOptions)
            }}
          />
          <Button
            type="button"
            variant={opt.isCorrect ? 'default' : 'outline'}
            onClick={() => toggleCorrect(index)}
          >
            {opt.isCorrect ? '✔️ Đúng' : 'Chọn đúng'}
          </Button>
        </div>
      ))}

      <div className="flex gap-2">
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="easy">Dễ</option>
          <option value="medium">Trung bình</option>
          <option value="hard">Khó</option>
        </select>
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Đang lưu...' : 'Tạo câu hỏi'}
      </Button>
    </div>
  )
}
