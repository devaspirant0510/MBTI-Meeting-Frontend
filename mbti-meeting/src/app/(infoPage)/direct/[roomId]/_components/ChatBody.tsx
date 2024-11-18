'use client';
import { useQuery } from '@tanstack/react-query';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import Dm from '@/app/_lib/data/entity/Dm';
import { FC } from 'react';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import MyChatBubble from '@/app/(infoPage)/direct/[roomId]/_components/MyChatBubble';
import OtherChatBubble from '@/app/(infoPage)/direct/[roomId]/_components/OtherChatBubble';

type Props = {
    roomId: number,
    userId: number
}
const ChatBody: FC<Props> = ({ roomId, userId }) => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'dm', roomId],
        queryFn: httpFetcher<ApiResult<Dm[]>>,
    });
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    console.log(data);
    return (
        <div className={'flex-grow overflow-y-auto'}>
            {data?.data?.map(item => {
                if (userId === item.sender.id) {
                    return <div key={item.id}>
                        <MyChatBubble dm={item} />
                    </div>;
                } else {
                    return <div key={item.id}>
                        <OtherChatBubble dm={item}/>
                    </div>
                }
            })}

        </div>
    );
};
export default ChatBody;