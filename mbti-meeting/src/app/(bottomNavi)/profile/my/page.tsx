import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import MyProfileAppBar from "@/app/(bottomNavi)/profile/_component/MyProfileAppBar";
import {Article} from "@/app/_lib/data/entity/Article";
import ProfileTab from "@/app/(bottomNavi)/profile/_component/ProfileTab";
import {Divider} from "@nextui-org/react";

export default async function ProfilePage(){
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcher<ApiResult<Account>>})
    await queryClient.prefetchQuery({queryKey:['v1','article','account','getAllArticle'],queryFn:httpFetcher<ApiResult<Article[]>>});
    const queries = dehydrate(queryClient);

    return (
            <HydrationBoundary state={queries}>
                <MyProfileAppBar/>
                <Divider/>
                <ProfileTab/>

            </HydrationBoundary>
    )
}