"use client"
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {supabase} from "@/app/_lib/supabseUtils";

export default function HomePage(){
    return (
        <>
            <Auth
                providers={['kakao']}
                appearance={{
                    theme: ThemeSupa,
                }}
                redirectTo={"/"}
                supabaseClient={supabase}
            />
        </>
    )
}