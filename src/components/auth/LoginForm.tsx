"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/utils/token";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LoginSchema) => {
       toast.dismiss(); 
      await toast.promise(
         fetch(`http://localhost:3000/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify(data)
        })
        .then(async( res)=>{
          const result = await res.json();
          if(!res.ok) throw new Error(result.message || "Đăng nhập thất bại")

          // Lưu token vào localStorage hoặc cookie nếu cần
          saveTokens(result.accessToken,result.refreshToken);
          router.push("/")
          return result
        }),
        {
          loading:"Đang xử lý đăng đăng nhập",
          success:"Đăng nhập thành công",
          error:(error)=> error.message || "Đăng nhập thất bại"
        }
      )

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm w-full">
      <div>
        <Input {...register("email")} placeholder="Email" className="input input-bordered w-full" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Input {...register("password")} type="password" placeholder="Mật khẩu" className="input input-bordered w-full" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
      </Button>
      <Link href="/register" className=" hover:active text-accent-foreground">Tạo tài khoản</Link>
    </form>
  );
}
