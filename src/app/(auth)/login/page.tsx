"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialLogin from "../../../components/auth/SocialLogin"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from 'sonner'
import LoginForm from "@/components/auth/LoginForm";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    // Call API login ở đây
    console.log("Login with:", email, password);
    router.push("/dashboard"); // giả sử chuyển hướng sau login
  };

  return(
    <div className="max-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
          <LoginForm />
          <SocialLogin />
      </div>
    </div>
  )
}
