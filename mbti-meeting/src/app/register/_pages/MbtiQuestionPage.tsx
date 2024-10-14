import {Button} from "@nextui-org/react";
import Link from "next/link";
import {useCallback} from "react";
import {useRegisterStore} from "@/app/_lib/store/registerStore";

export default function MbtiQuestionPage() {
    const {setPage} = useRegisterStore();
    const onClickOkButton = useCallback(() => {
        setPage(2)
    }, [])
    return (
        <div className={"p-4"}>
            <div className={"text-2xl font-black"}>
                MBTI 검사를 해본적이 있나요?
            </div>
            <div className={"my-4"}>
                "MBTI Meeting" 은 MBTI 를 기반으로 유저와 소통하는 서비스입니다.
            </div>
            <div className={"flex flex-col"}>
                <Button style={{background: 'var(--primary1)', color: 'white'}}
                        className={'text-xl font-extrabold my-4 py-5.5 rounded-full'} onClick={onClickOkButton}>
                    네
                </Button>
                <Link
                    href={"https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC"}
                    target="_blank">
                    <Button fullWidth style={{background: 'var(--primary3)'}}
                            className={'text-xl font-extrabold my-4 py-5.5 rounded-full'}>
                        아니오
                    </Button>
                </Link>
            </div>
        </div>
    )
}