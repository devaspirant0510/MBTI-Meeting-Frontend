import { QueryFunctionContext } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import refreshJwtToken from '@/app/_lib/core/refreshJwtToken';

export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;


interface HttpFetcherProps {
    contentType: string;
}

const defaultOption: HttpFetcherProps = {
    contentType: 'application/json',
};

export async function httpFetcherServer<T>(queryContext: QueryFunctionContext): Promise<T> {
    try {
        const accessToken = cookies().get('accessToken')?.value;
        console.log('token', accessToken);

        const keys = queryContext.queryKey.join('/');
        console.log(keys);
        const result = await fetch(`${serverURL}/${keys}`, {
            headers: {
                'Content-Type': defaultOption.contentType,
                'Authorization': `Bearer ${accessToken}`,
            },
            cache: 'no-cache',
        });
        const jsonData = await result.json() as T;
        console.log(jsonData);
        if (jsonData.message.startsWith('토큰이 만료되었습니다')) {
            console.log('쿠키 삭제');
            const refreshToken = cookies().get('refreshToken')?.value;
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
            console.log('refresh', refreshToken,cookies().get("refresh")?.value);

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
            return newJsonData as T;
        }
        return jsonData;
    } catch (e) {
        console.log('1error ', e.message);
        console.error(e);
        throw Error(e)
    }

}