import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {httpFetcherServer} from "@/app/_lib/fetcher/httpFetcherServer";
import Header from '@/app/(afterLogin)/direct/_components/Header';
import { Divider } from '@nextui-org/react';
import MainContent from '@/app/(afterLogin)/direct/_components/MainContent';

export default async function DirectPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['v1', 'auth', 'getUser'], queryFn: httpFetcherServer<ApiResult<Account>>})
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser'],) as ApiResult<Account>
    await queryClient.prefetchQuery({queryKey: ['v1', 'dm', 'room','account' ,user?.data?.id],queryFn:httpFetcherServer<ApiResult<Account>>});
    const hydrateState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={hydrateState}>
            <Header/>
            <Divider/>
            <MainContent id={user!.data!.id!}/>

        </HydrationBoundary>
    )
}