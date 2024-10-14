"use client"
import {Button, Checkbox, ScrollShadow} from "@nextui-org/react";
import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {useRegisterStore} from "@/app/_lib/store/registerStore";

const PolicyPage = () => {
    const {setPage,} = useRegisterStore();
    const [checked, setChecked] = useState(false)
    const onChangeCheckBox = useCallback(() => {
        setChecked(prevChecked => !prevChecked);

    }, [])
    const onClickNextButton = useCallback(() => {
        if (!checked) {
            setChecked(true);
            setTimeout(() => {
                setPage(1)
            }, 500);
        }
        setPage(1);
    }, [checked]);
    return (
        <div className={"p-4"}>
            <div className={"text-2xl font-black my-4"}> 개인정보 처리방침</div>
            <div style={{width: '100%'}}>
                <ScrollShadow style={{height: '200px', overflowY: 'scroll'}}>
                    여러분의 모든 데이터는 인공지능이
                    학습하여 더 나은 서비스를 제공합니다
                    정보수집에 동의 하세요
                </ScrollShadow>
            </div>
            <Button>자세히보기</Button>
            <div className={"text-2xl font-black my-4"}> 이용약관</div>
            <div style={{width: '100%'}}>
                <ScrollShadow style={{height: '200px', overflowY: 'scroll'}}>
                    여러분의 모든 데이터는 인공지능이
                    학습하여 더 나은 서비스를 제공합니다
                    정보수집에 동의 하세요
                </ScrollShadow>
            </div>
            <Button>자세히보기</Button>
            <div className={"my-4"}>
                <Checkbox onChange={onChangeCheckBox} checked={checked}/>
                위 약관에 모두 동의합니다.
            </div>
            <Button onClick={onClickNextButton}>
                {checked ? "다음으로가기" : "동의하고다음으로가기"}

            </Button>
        </div>
    );
}
export default PolicyPage;