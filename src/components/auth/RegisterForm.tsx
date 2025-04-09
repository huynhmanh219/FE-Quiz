"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";


const registerSchema = z
  .object({
    name: z.string().min(2, "Tên ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter()
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const [flag,setFlag] = useState(false)
  const onSubmit = async (data: RegisterSchema) => {
    try {  
       await toast.promise(
        fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then(async (res) => {
          const result = await res.json();
          if (!res.ok) throw new Error(result.error || "Đăng ký thất bại");
          router.push("/login");
          return result;
        }),
        {
          loading: "Đang xử lý đăng ký...",
          success: "🎉 Đăng ký thành công!",
          error: (err) => err.message || "Đăng ký thất bại",
        }
      );
   
    }catch(error){

    }};
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm w-full">
      <div>
        <Input {...register("name")} placeholder="Họ và tên" className="input input-bordered w-full" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Input {...register("email")} placeholder="Email" className="input input-bordered w-full" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Input {...register("password")} type="password" placeholder="Mật khẩu" className="input input-bordered w-full" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="input input-bordered w-full"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
}
