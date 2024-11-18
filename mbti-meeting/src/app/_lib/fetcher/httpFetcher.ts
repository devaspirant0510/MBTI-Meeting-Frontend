import {QueryFunctionContext} from "@tanstack/react-query";
import {getCookie} from "cookies-next";
import refreshJwtToken from '@/app/_lib/core/refreshJwtToken';

export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL


interface HttpFetcherProps {
    contentType: string
}

const defaultOption: HttpFetcherProps = {
    contentType: "application/json",
}

export async function httpFetcher<T>(queryContext: QueryFunctionContext): Promise<T> {
    try {
        const accessToken = getCookie('accessToken')
        console.log("token",accessToken)
        console.log(queryContext,defaultOption)

        const keys = queryContext.queryKey.join("/")
        console.log(keys)
        const result = await fetch(`${serverURL}/${keys}`, {
            headers: {
                "Content-Type": defaultOption.contentType,
                "Authorization":`Bearer ${accessToken}`,
            },
            cache:'no-cache'
        })
        const jsonData = await result.json() as T;
        console.log(jsonData)
        console.log(jsonData);
        // eslint-disable-next-line
        //@ts-ignore
        if (jsonData?.message?.startsWith('토큰이 만료되었습니다')) {
            console.log('쿠키 삭제');
            const refreshToken = getCookie("refreshToken")
            const jwtToken = await refreshJwtToken(refreshToken!);
            console.log(jwtToken);
            console.log("result",jwtToken.refresh_token);
            const tokenData = {
                accessToken: jwtToken.access_token,
                refreshToken: jwtToken.refresh_token,
            }
            const requestFetch = await fetch(`http://localhost:3000/api/cookie`,{
                method:'POST',
                body:JSON.stringify(tokenData)
            })
            console.log(requestFetch);
            const newAccessToken = jwtToken['access_token'];//cookies().get('accessToken')?.value;
            console.log('token', newAccessToken);

            const keys = queryContext.queryKey.join('/');
            console.log(keys);
            const result = await fetch(`${serverURL}/${keys}`, {
                headers: {
                    'Content-Type': defaultOption.contentType,
                    'Authorization': `Bearer ${newAccessToken}`,
                },
                cache: 'no-cache',
            });
            const newJsonData = await result.json() as T;
            console.log(newJsonData);
            return newJsonData;
        }
        return jsonData
    }
        // eslint-disable-next-line
        //@ts-ignore
    catch (e) {
        console.log(e)
    }

}