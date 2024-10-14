import ApiResult from "@/app/_lib/data/entity/ApiResult";

export function errorBuilder(data:ApiResult<unknown>){
    return `error : ${data.error?.code} ${data.error?.message}\n${data.message}`

}