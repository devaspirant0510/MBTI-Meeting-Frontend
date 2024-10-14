import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";
import {errorBuilder} from "@/app/_lib/core/errorBuilder";

export async function loginWithTokenApi(accessToken:string){
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/login`,{
        method:'POST',
        headers:{
            'Authorization': `Bearer ${accessToken}`
        },
        cache:'no-cache',
    })
    const data=  result.body as ApiResult<Account>
    if(!data.success){
        throw Error(errorBuilder(data))
    }
    console.log(data)
    return data.data

}