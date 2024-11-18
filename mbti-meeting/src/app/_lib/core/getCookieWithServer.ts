import {cookies} from "next/headers";

const getCookieWithServer = ()=>{
    return cookies().get("accessToken")?.value
}
export default getCookieWithServer;