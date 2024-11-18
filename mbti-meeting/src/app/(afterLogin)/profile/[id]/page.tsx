import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Member } from '@/app/_lib/data/entity/Member';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import OtherProfile from '@/app/(afterLogin)/profile/[id]/_component/OtherProfile';
import { Account } from '@/app/_lib/data/entity/Account';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';
import { Article } from '@/app/_lib/data/entity/Article';

export default async function UserProfilePage({ params }: { params: { id: number } },
) {
    console.log(params.id);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', params.id],
        queryFn: httpFetcherServer<ApiResult<Member>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcherServer<ApiResult<Account>>,
    });
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'like', user.data?.id],
        queryFn: httpFetcherServer <ApiResult<ArticleLiked[]>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'article', 'account', user.data?.id],
        queryFn: httpFetcherServer <ApiResult<Article[]>>,
    });

    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>
            <OtherProfile id={params.id} />
        </HydrationBoundary>
    );
}