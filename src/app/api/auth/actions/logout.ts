import { clearTokens } from "@/utils/token"

export const logout = ()=>{
    clearTokens()
    window.location.href= "/login"
}