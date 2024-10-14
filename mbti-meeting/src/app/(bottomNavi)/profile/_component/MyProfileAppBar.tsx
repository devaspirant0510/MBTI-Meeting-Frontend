"use client"
import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";
import {Avatar, Button} from "@nextui-org/react";

const MyProfileAppBar = () => {
    const {isLoading, data} = useQuery({queryKey: ['v1', 'auth', 'getUser'], queryFn: httpFetcher<ApiResult<Account>>})
    if (isLoading) {
        return <>loading</>
    }
    console.log(data)
    if (!data) {
        return <>no data</>
    }
    return (
        <div className={'p-4 mt-4'}>
            <div className={'flex justify-between items-start '}>
                <div className={'flex items-start flex-col'}>
                    <div className={'text-xl text-gray-500'}>{data.data?.member?.mbti?.toString()}</div>
                    <div className={'text-3xl font-bold'}>{data.data?.member?.nickName?.toString()}</div>
                </div>
                <div>
                    <Avatar className={'w-24 h-24 text-large'} name={data.data?.member?.mbti?.toString()}/>
                </div>
            </div>
            <div className={'flex items-center'}>
                <span className={"text-xl font-bol mr-2"}>
                    팔로우
                </span>
                <div className={""}>
                    {data.data?.member?.followers?.length}
                </div>
            </div>
            <div className={'flex items-center'}>
                <span className={"text-xl font-bol mr-2"}>
                    팔로잉</span>
                <div className={""}>
                    {data.data?.member?.followings?.length}
                </div>
            </div>
            <div className={'flex'}>
                <Button className={'m-2'} fullWidth>프로필편집</Button>
                <Button className={'m-2'} fullWidth>프로필공유</Button>
            </div>
        </div>
    )
}
export default MyProfileAppBar;