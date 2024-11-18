'use server';
import ReccomendUser from '@/app/_components/index/ReccomendUser';
import { Account } from '@/app/_lib/data/entity/Account';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AppBar from '@/app/(afterLogin)/_components/AppBar';
import { Divider } from '@nextui-org/react';
import { Article } from '@/app/_lib/data/entity/Article';
import ArticleList from '@/app/(afterLogin)/_components/ArticleList';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import { Member } from '@/app/_lib/data/entity/Member';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'recommend'],
        queryFn: httpFetcherServer<ApiResult<Account[]>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'article'],
        queryFn: httpFetcherServer<ApiResult<Article[]>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'recommend'],
        queryFn: httpFetcherServer<ApiResult<Member[]>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcherServer<ApiResult<Account>>,
    });
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'like', user?.data?.id],
        queryFn: httpFetcherServer<ApiResult<ArticleLiked>>,
    });
    console.log('useraaaa:', user);
    const queries = dehydrate(queryClient);
    return (
        <HydrationBoundary state={queries}>
            <div className={'flex flex-col h-screen'}>
                <AppBar />
                <Divider />
                <div className={''}>
                    <main className={'w-full flex justify-center flex-col items-center p-2 '}>
                        <div className={'mt-2 flex-1 w-full '}>
                            <div className={'text-xl font-bold text-left self-start mb-2 '}>이런 사람 어때?</div>
                            <article className={'mt-2'}>
                                <ReccomendUser />
                            </article>
                            <article className={'mt-4'}>
                                <ArticleList accountId={user!.data!.id!} />
                            </article>
                        </div>
                    </main>
                </div>
            </div>
        </HydrationBoundary>
    );

}
