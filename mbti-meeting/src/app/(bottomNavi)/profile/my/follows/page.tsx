import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import ProfileFollow from "@/app/(bottomNavi)/profile/_component/ProfileFollow";

export default async function FollowPage(){
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcher<ApiResult<Account>>})
    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>
            <ProfileFollow/>



        </HydrationBoundary>
    );
}