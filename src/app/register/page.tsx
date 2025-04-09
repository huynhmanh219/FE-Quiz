"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { escape } from "querystring"
import { useState } from "react"

export default function RegisterPage(){
    const router = useRouter()
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async()=>{
        const res= await fetch("/api/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        })
        const data = await res.json()
        if(res.ok){
            alert("Đăng ký thành công")
            router.push("/login")
        }
        else{
            alert(data.message || "Đăng ký thất bại")
        }
    }
    return(
        <>
            <main className="max-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Đăng ký</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Tên</Label>
                                <Input id="name" name="name" onChange={handleChange} ></Input>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" onChange={handleChange} ></Input>
                            </div>
                            <div>
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" name="password" onChange={handleChange} ></Input>
                            </div>
                            <Button className="w-full" onClick={handleSubmit}>Đăng ký</Button>
                        </CardContent>
                </Card>
            </main>    
        </>
    )
}