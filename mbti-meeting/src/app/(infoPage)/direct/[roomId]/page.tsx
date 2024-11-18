import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import Dm from '@/app/_lib/data/entity/Dm';
import { DmRoom } from '@/app/_lib/data/entity/DmRoom';
import Header from '@/app/(infoPage)/direct/[roomId]/_components/Header';
import ChatForm from '@/app/(infoPage)/direct/[roomId]/_components/ChatForm';
import ChatBody from '@/app/(infoPage)/direct/[roomId]/_components/ChatBody';

export default async function DmRoomPage({ params }: { params: { roomId: number } },) {
    console.log("paaaa",params);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcherServer<ApiResult<Account>>,
    });
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    await queryClient.prefetchQuery({
        queryKey:['v1','dm','room',params.roomId],
        queryFn:httpFetcherServer<ApiResult<DmRoom>>,
    })
    await queryClient.prefetchQuery({
        queryKey:['v1','dm',params.roomId],
        queryFn:httpFetcherServer<ApiResult<Dm>>,
    })
    const room = queryClient.getQueryData(['v1','dm','room',params.roomId]) as ApiResult<DmRoom>;
    console.log("room" ,room.data?.accountDmRooms);
    const roomData = room!.data!.accountDmRooms!
    const otherUser = roomData.find(item=>item!.account!.member!.id! !==user.data?.member?.id)



    await queryClient.prefetchQuery({
        queryKey:['v1','auth',otherUser?.account.id],
        queryFn:httpFetcherServer<ApiResult<Account>>,
    })
    const deHydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={deHydrateState}>
            <div className={'flex flex-col h-screen'}>
                <Header user={otherUser!.account.id!}/>
                <ChatBody roomId={params.roomId} userId={user!.data!.id!}/>
                <ChatForm roomId={params.roomId} userId={user!.data!.id!}/>
            </div>
        </HydrationBoundary>
    );

}