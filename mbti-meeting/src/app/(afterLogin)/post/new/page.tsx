import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import WritePostForm from "@/app/(afterLogin)/post/_components/WritePostForm";
import {httpFetcherServer} from "@/app/_lib/fetcher/httpFetcherServer";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";

export default async function PostNewPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser'],queryFn:httpFetcherServer<ApiResult<Account>>})
    const dehydrateState = dehydrate(queryClient)
    return (
        <HydrationBoundary state={dehydrateState}>
            <WritePostForm/>
        </HydrationBoundary>
    );
}