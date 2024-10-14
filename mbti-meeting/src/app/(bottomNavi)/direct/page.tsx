import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";

export default async function DirectPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['v1', 'auth', 'getUser'], queryFn: httpFetcher<ApiResult<Account>>})
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser'],) as ApiResult<Account>
    await queryClient.prefetchQuery({queryKey: ['v1', 'dm', 'room', user?.data?.id],queryFn:httpFetcher<ApiResult<Account>>});
    const hydrateState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={hydrateState}>
        </HydrationBoundary>
    )
}