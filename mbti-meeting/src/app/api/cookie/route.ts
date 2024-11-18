import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    console.log(request);
    const {refreshToken,accessToken} = await request.json();
    if (accessToken && refreshToken) {
        cookies().set('accessToken', accessToken);
        cookies().set('refresh', refreshToken);
        return new Response('token updated successfully!!', { status: 200 });
    }
    return new Response('Bad Request : Please check parameter', { status: 400 });
}