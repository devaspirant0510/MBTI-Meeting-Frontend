"use client"
import Image from "next/image";
import {useCallback, useEffect} from "react";
import {supabase} from "@/app/_lib/supabseUtils";

export default function LoginPage() {
    const onClick = useCallback(async () => {
        const {data, error} = await supabase.auth.signInWithOAuth(
            {provider: 'kakao',})
        console.log(data, error)

    }, [])
    return (
        <div className={"flex justify-center flex-col items-center"}>
            <h1 className={"text-4xl font-black"}>MBTI Meeting</h1>
            <Image onClick={onClick} src={"/images/kakao_login_button.png"} alt={"카카오 로그인 버튼"} width={300}
                   height={45}/>
        </div>
    );
}