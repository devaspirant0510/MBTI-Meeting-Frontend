'use client';
import Image from 'next/image';
import { createClient } from '@/app/_lib/csr/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
    const supabase = createClient();
    return (
        <div className={'flex flex-col p-4'}>
            <h1 className={'text-4xl text-center font-normal mt-8'}>MBTI MEETING</h1>
            <div className={'flex justify-center mt-4'}>
                <Image src={'/images/logo.png'} alt={'logo'} width={150} height={150} className={'text-center'}/>
            </div>
            <Auth
                localization={{
                    variables: {
                        sign_in: {
                            email_label: '이메일',
                            password_label: '비밀번호',
                            email_input_placeholder:'이메일 입력',
                            password_input_placeholder:'이메일 입력',
                            button_label:'로그인',
                            social_provider_text:'{{provider}} 로그인',
                            link_text:'계정이 없으신가요? 회원가입',

                        },
                    },
                }}
                supabaseClient={supabase}
                providers={['kakao','google','facebook']}
                redirectTo={`${location.origin}/auth/callback`}
                appearance={{theme:ThemeSupa}}
            />
        </div>
    );
}