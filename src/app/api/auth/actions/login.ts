import { saveTokens } from "@/utils/token"


export const login = async(email:string,password:string)=>{
    const res = await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{"Content-Type":"application/json"}
    })

    if(!res.ok)
    {
        throw new Error("Sai thông tin đăng nhập")
    }
    const data = await res.json()
    saveTokens(data.accessToken,data.refreshToken)
}