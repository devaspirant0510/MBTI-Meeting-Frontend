'use client';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { Button, Divider, Switch } from '@nextui-org/react';
import { useCallback } from 'react';
import { setCookie } from 'cookies-next';

const ProfileSetting = () => {
    const router = useRouter();
    const onClickBack = useCallback(() => {
        router.back();
    }, []);
    const onClickLogout = useCallback(() => {
        setCookie('accessToken', null);
        setCookie('refreshToken', null);
        router.replace('/login');
    }, []);
    return (
        <div className={'max-h-full flex flex-col'}>
            <div className="flex p-4 items-center">
                <ArrowBack onClick={onClickBack} style={{ fontSize: 35 }} />
                <span className={'ml-2 text-3xl'}>설정</span>
            </div>
            <div className={'flex flex-col justify-between p-4'}>
                <main className={'mb-4 py-4'}>
                    <div className={'flex items-center justify-between p-4'}>
                        <span>알림설정</span>
                        <Switch />
                    </div>
                    <Divider />
                </main>
                <div className={'flex flex-col'}>
                    <Button className={'mb-4'} color={'danger'} variant={'bordered'}>회원탈퇴</Button>
                    <Button className={'mb-4'} color={'danger'} variant={'bordered'}
                            onClick={onClickLogout}>로그아웃</Button>
                </div>
            </div>
        </div>
    );
};
export default ProfileSetting;