'use server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Account } from '@/app/_lib/data/entity/Account';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import MyProfileAppBar from '@/app/(afterLogin)/profile/_component/MyProfileAppBar';
import { Article } from '@/app/_lib/data/entity/Article';
import ProfileTab from '@/app/(afterLogin)/profile/_component/ProfileTab';
import { Divider } from '@nextui-org/react';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';

export default async function ProfilePage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcherServer<ApiResult<Account>>,
    });
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'article', 'account', 'getAllArticle'],
        queryFn: httpFetcherServer<ApiResult<Article[]>>,
    });
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'like', user.data?.id],
        queryFn: httpFetcherServer<ApiResult<ArticleLiked[]>>,
    });
    const queries = dehydrate(queryClient);

    return (
        <HydrationBoundary state={queries}>
            <MyProfileAppBar />
            <Divider />
            <ProfileTab />

        </HydrationBoundary>
    );
}