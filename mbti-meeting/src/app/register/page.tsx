import Register from "@/app/register/_components/Register";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcherServer} from "@/app/_lib/fetcher/httpFetcherServer";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";

export default async function RegisterPage(){
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcherServer<ApiResult<Account>>})
    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>
            <Register/>
        </HydrationBoundary>
    );
}