"use client"

import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Divider, Tab, Tabs} from "@nextui-org/react";
import CloseButton from "@/app/(afterLogin)/post/_components/CloseButton";
import ProfileNameText from "@/app/_components/atom/ProfileNameText";
import UserFollowerItem from "@/app/(afterLogin)/profile/_component/UserFollowItem";

const ProfileFollow = ()=>{
    const {isLoading,data,isError,error} = useQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcher<ApiResult<Account>>})
    if(isLoading){
        return (
            <>
                loading
            </>
        )
    }
    if(isError){
        return (
            <>
                {error}
            </>
        )
    }
    if(!data){
        return <>nodata</>
    }
    if(!data.data){
        return <> nodata</>
    }
    return (
        <div>
            <nav className={"flex mb-3"}>
                <CloseButton/>
                <ProfileNameText member={data?.data?.member}/>
            </nav>
            <Divider/>
            <Tabs fullWidth>
                <Tab key={'follower'} title={"팔로워"}>
                    {data.data.member?.followers?.map(item=>{
                        return (
                            <div key={item.id}>
                                <UserFollowerItem follow={item}/>
                            </div>
                        )
                    })}
                </Tab>
                <Tab key={'following'} title={"팔로잉"}>
                    {data.data.member?.followings?.map(item=>{
                        return (
                            <div key={item.id}>
                                <UserFollowerItem follow={item}/>
                            </div>
                        )
                    })}
                </Tab>
                <Tab key={"requested"} title={"요청됨"}>
                </Tab>
            </Tabs>

        </div>
    );
}
export default ProfileFollow;