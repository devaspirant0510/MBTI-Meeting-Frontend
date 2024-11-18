"use server"
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import ProfileFollow from "@/app/(afterLogin)/profile/_component/ProfileFollow";
import {httpFetcherServer} from "@/app/_lib/fetcher/httpFetcherServer";

export default async function FollowPage(){
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcherServer<ApiResult<Account>>})
    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>
            <ProfileFollow/>



        </HydrationBoundary>
    );
}