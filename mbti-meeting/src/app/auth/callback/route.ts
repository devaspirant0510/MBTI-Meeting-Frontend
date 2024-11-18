"use server"
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {createClient} from "@/app/_lib/ssr/supabase";
import ApiResult from "@/app/_lib/data/entity/ApiResult";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    console.log(requestUrl)
    const code = requestUrl.searchParams.get('code');
    if (code) {
        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);
        const {data: {session}} = await supabase.auth.exchangeCodeForSession(code)
        if (session?.access_token) {
            const response = NextResponse.redirect(requestUrl.origin);
            cookies().set("accessToken", session.access_token)
            cookies().set("refreshToken", session.refresh_token)
            console.log("sessuib", session)
            const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/isJoin?uid=${session.user.id}`)
            const responseBody = (await result.json()) as ApiResult<boolean>;
            console.log("sdsddsds", responseBody)
            if (!responseBody.data) {
                // 계정정보로 회원가입하고 회원 가입 페이지로 이동
                const userInfo = {
                    'provider': session.user.app_metadata.provider,
                    'email': session.user.email,
                    'uid': session.user.id
                }
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // JSON 형식임을 명시
                    },
                    body: JSON.stringify(userInfo)
                });
                return NextResponse.redirect(requestUrl.origin + "/register")
            }
            return response;
        }
    }
    return NextResponse.redirect(requestUrl.origin);
}