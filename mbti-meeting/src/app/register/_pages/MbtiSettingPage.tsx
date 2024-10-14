"use client"
import {useState} from "react";
import MbtiButton from "@/app/register/_components/MbtiButton";
import {useRegisterStore} from "@/app/_lib/store/registerStore";
import {Button} from "@nextui-org/react";

export default function MbtiSettingPage() {
    const {mbti1,setMbti1,mbti2,setMbti2,mbti3,setMbti3,mbti4,setMbti4, setPage} = useRegisterStore();
    return (
        <div className={"p-4"}>
            <div className={"text-2xl font-black"}>
                MTBI 를 선택해주세요
            </div>
            <div className={"flex justify-evenly"}>
                <MbtiButton state={mbti1} value={"I"} desc={"내향형"} setValue={setMbti1}/>
                <MbtiButton state={mbti1} value={"E"} desc={"외향형"} setValue={setMbti1}/>
            </div>
            <div className={"flex justify-evenly"}>
                <MbtiButton state={mbti2} value={"N"} desc={"직관형"} setValue={setMbti2}/>
                <MbtiButton state={mbti2} value={"S"} desc={"감각형"} setValue={setMbti2}/>
            </div>
            <div className={"flex justify-evenly"}>
                <MbtiButton state={mbti3} value={"T"} desc={"사고형"} setValue={setMbti3}/>
                <MbtiButton state={mbti3} value={"F"} desc={"감정형"} setValue={setMbti3}/>
            </div>
            <div className={"flex justify-evenly"}>
                <MbtiButton state={mbti4} value={"J"} desc={"판단형"} setValue={setMbti4}/>
                <MbtiButton state={mbti4} value={"P"} desc={"인식형"} setValue={setMbti4}/>
            </div>
            <div className={"text-xl"}>당신의 MBTI는...</div>
            <div className={"flex"}>
                <div style={{width:'100px'}} className={"text-2xl"}>{mbti1}{mbti2}{mbti3}{mbti4}</div>
                <div className={"text-xl"}>입니다</div>
            </div>
            <Button
                style={{background:'var(--primary1)', color: 'white'}}
                fullWidth onClick={()=>{
                setPage(3)
            }}>
                다음
            </Button>


        </div>
    )
}