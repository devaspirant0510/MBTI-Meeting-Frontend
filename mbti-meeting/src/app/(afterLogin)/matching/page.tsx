'use client';
import Image from 'next/image';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function MatchingPage() {
    const [isMatching, setMatching] = useState(false);

    return (
        <div className={'flex flex-col items-center flex-grow'}>
            <div className={'flex flex-col items-center justify-center'}>
                <div className={'text-5xl font-bold mt-8'}>MBTI Meeting</div>
                <div className={'text-lg'}>새로운 만남의 시작 서로를 알아가봐요</div>
                <Image className={'mt-2'} src={'/images/logo.png'} alt={'logo'} width={300} height={300} />
                <Button
                    onClick={() => {
                        setMatching(value=>!value);
                        setTimeout(()=>{
                            setMatching(false);
                        },5000)

                    }}
                    isLoading={isMatching}
                    className="flex justify-center items-center w-40 h-40 rounded-full border-4 border-gradient-to-r from-blue-500 to-purple-500 bg-transparent">
                    {
                        isMatching ?<></>:
                            <div className="flex flex-col items-center">
                                <div className="text-center  mb-2">음성통화하기</div>
                                <WifiCalling3Icon style={{ fontSize: 40 }} />
                            </div>


                    }
                </Button>
            </div>

        </div>
    );
}