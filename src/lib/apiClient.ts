import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from "@/utils/token"


export const apiClient = async(url:string,options:RequestInit = {})=>{
    let accessToken = getAccessToken();
    
    let res = await fetch(url,{
        ...options,
        headers:{
            ...(options.headers || {}),
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json"
        }
    });

    if(res.status === 401){
        const refreshToken = getRefreshToken();
        const refreshRes = await fetch("api/auth/refresh",{
            method:"POST",
            body:JSON.stringify({refreshToken}),
            headers:{"Content-Type":"application/json"}
        })
        
        if(refreshRes.ok)
        {
            const data = await refreshRes.json()
            saveTokens(data.accessToken,data.refreshToken)

            accessToken = data.accessToken
            res= await fetch(url,{
                ...options,
                headers:{
                    ...(options.headers || {}),
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                },
            })
        }
        else{
            clearTokens();
            throw new Error("Phiên đăng nhập hết hạn")
        }
    }

    return res
    

}