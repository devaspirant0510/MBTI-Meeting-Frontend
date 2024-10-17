import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";
import ProfileSetting from "@/app/(bottomNavi)/profile/_component/ProfileSetting";

export default async function SettingPage(){
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcher<ApiResult<Account>>})
    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>
            <ProfileSetting/>
        </HydrationBoundary>
    )
}