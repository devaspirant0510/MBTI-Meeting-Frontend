"use client"
import React, {useCallback} from "react";
import {Button} from "@nextui-org/react";
import Lottie from 'react-lottie-player';
import fireCracker from "@/app/_asset/fire_cracker.json";
import { useRouter} from "next/navigation";


export default function SuccessPage() {
    const router = useRouter();
    const onClickHomeButton = useCallback(() => {
        router.replace("/");
    }, []);

    return (
        <div className={'flex flex-col justify-center'}>
            <h1 className={'absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl mt-12'}>가입을 축하합니다! 🎉</h1>
            <Lottie
                loop
                animationData={fireCracker}
                play
            />
            <Button onClick={onClickHomeButton} className={'absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl mb-12 '}>
                홈으로
            </Button>
        </div>);
}