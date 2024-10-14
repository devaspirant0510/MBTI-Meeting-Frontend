"use client"

import {QueryClient, useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {useEffect} from "react";
import UserProfile from "@/app/_components/index/_component/UserProfile";
import {Member} from "@/app/_lib/data/entity/Member";

const ReccomendUser = () => {
    const queryClient = new QueryClient();
    const userData= queryClient.getQueryData<ApiResult<Member[]>>(['v1','member','recommend'])
    console.log(userData)

    const {isLoading, data, error, isError} = useQuery({
        queryKey: ['v1', 'member', 'recommend'],
        queryFn: httpFetcher<ApiResult<Member[]>>
    });
    useEffect(() => {

    }, [])
    if (isLoading) {
        return <>isloading</>
    }
    if (isError) {
        return <>{error}</>
    }
    console.log("a", data)
    return (
        <div className={'w-full'}>
            <div className={'flex self-start'}>
                {
                    data?.data?.map(item => {
                        return (
                            <div className={'mr-4'} key={item.id}>
                                <UserProfile member={item}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ReccomendUser;