"use client"
import {useRouter} from "next/navigation";
import {ArrowBack} from "@mui/icons-material";
import {Button, Divider, Switch} from "@nextui-org/react";

const ProfileSetting = ()=>{
    const router = useRouter();
    return (
        <div className={"max-h-full"}>
            <div className="flex p-4 items-center">
                <ArrowBack style={{fontSize:35}}/>
                <span className={'ml-2 text-3xl'}>설정</span>
            </div>
            <div className={"flex flex-col justify-between "}>
                <main>
                    <div>
                        <span>알림설정</span>
                        <Switch/>
                    </div>
                    <Divider/>
                </main>
                <div>
                    <Button color={'danger'} variant={'bordered'}>회원탈퇴</Button>
                    <Button color={'danger'} variant={'bordered'}>로그아웃</Button>
                </div>
            </div>
        </div>
    )
}
export default ProfileSetting;