import {Button} from "@nextui-org/react";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

export default function ProfileSettingPage() {
    const router = useRouter();
    const onClickJoinButton = useCallback(() => {
        /**
         * {
         *   "id": 0,
         *   "name": "string",
         *   "nickName": "string",
         *   "birthday": "2024-09-30T00:39:58.296Z",
         *   "createdAt": "2024-09-30T00:39:58.296Z",
         *   "mbti": "ISTJ",
         *   "uid": "string"
         * }
         */
        const birth = new Date();
        birth.setFullYear(2002, 4, 10)
        const data = {
            name: "이승호",
            nickname: "코틀린과node",
            birthday: birth,
            createdAt: new Date(),
            mbti: "INTP",
            uid: "aadsfsf34sfd"
        }
        fetch("http://localhost:8080/api/v1/auth", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // 요청의 Content-Type을 application/json으로 설정
            },
            body: JSON.stringify(data)
        }).then((response: Response) => {
            console.log(response)
            router.replace("/success")

        });

    }, [])

    return (
        <div className={"flex flex-col p-4 justify-between h-full"}>
            <div>
                <span className={"text-2xl font-bold justify-start items-start"}>프로필 사진 설정하기</span>
                <div className={"text-center flex justify-center items-center w-full"}>
                    <div className={"rounded-full flex justify-center items-center"}
                         style={{width: 250, height: 250, background: "grey"}}>사진
                    </div>
                </div>
            </div>
            <Button onClick={onClickJoinButton}>다음에 설정할래요</Button>


        </div>
    )
}