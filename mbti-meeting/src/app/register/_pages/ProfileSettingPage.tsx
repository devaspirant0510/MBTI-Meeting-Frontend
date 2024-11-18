import {Button} from "@nextui-org/react";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";
import {useRegisterStore} from "@/app/_lib/store/registerStore";
import {getCookie} from "cookies-next";


export default function ProfileSettingPage() {
    const {isLoading,isError,error,data}  = useQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcher<ApiResult<Account>>});
    const {name,mbti1,mbti2,mbti3,mbti4,sex} = useRegisterStore();
    const router = useRouter();
    const onClickJoinButton = useCallback(() => {
        if(!data?.data) return;
        const jsonBody = {
            accountId:data?.data.id,
            member:{
                nickName:name,
                mbti:mbti1+mbti2+mbti3+mbti4,
                gender:sex
            }
        }
        const accessToken = getCookie("accessToken");
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json" , // 요청의 Content-Type을 application/json으로 설정
                "Authorization": accessToken!
            },
            body: JSON.stringify(jsonBody)
        }).then((response: Response) => {
            console.log(response)
            router.replace("/success")
        });

    }, [data])
    if(isLoading) {
        return <>loading</>
    }
    if(isError){
        return <>{error}</>
    }
    if(!data){
        return <>nodata</>
    }

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