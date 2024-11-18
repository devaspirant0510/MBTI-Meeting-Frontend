import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import ArticleInfo from '@/app/(infoPage)/article/[id]/_components/ArticleInfo';

export default async function ArticleInfoPage({ params }: { params: { id: number } }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'article', params.id],
        queryFn:httpFetcherServer<ApiResult<Account>>
    });
    await queryClient.prefetchQuery({
        queryKey:['v1','comment','article',params.id],
        queryFn:httpFetcherServer<ApiResult<Comment[]>>,
    })
    await queryClient.prefetchQuery({
        queryKey:['v1','auth','getUser'],
        queryFn:httpFetcherServer<ApiResult<Account>>
    })
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    const dehydrateState = dehydrate(queryClient)
    return (
        <HydrationBoundary state={dehydrateState}>
            <ArticleInfo id={params.id} userId={user!.data!.id!}/>

        </HydrationBoundary>
    );
}