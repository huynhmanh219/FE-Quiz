"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function LoginPage(){
    const router = useRouter()
    const [form,setForm]= useState({email:"",password:""})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleLogin = async()=>{
        const res = await fetch("/api/auth/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        const data = await res.json()
        if (res.ok) {
          localStorage.setItem("accessToken", data.accessToken)
          localStorage.setItem("refreshToken", data.refreshToken)
          alert("Đăng nhập thành công!")
          router.push("/") // hoặc dashboard
        } else {
          alert(data.message || "Sai tài khoản hoặc mật khẩu")
        }
    }
    return(
        <main className="max-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" name="password" type="password" onChange={handleChange} />
            </div>
            <Button className="w-full" onClick={handleLogin}>Đăng nhập</Button>
            <Link href="/register" className="hover:via-teal-400">Chưa có tài khoản ?</Link>
          </CardContent>
        </Card>
      </main>
    )
}