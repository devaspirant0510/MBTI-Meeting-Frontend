'use client';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import { DmRoom } from '@/app/_lib/data/entity/DmRoom';
import { Card, CardHeader } from '@nextui-org/card';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import Link from 'next/link';

type Props = {
    id: number
}
const MainContent: FC<Props> = ({ id }) => {
        const { isLoading, data, isError, error } = useQuery({
            queryKey: ['v1', 'dm', 'room','account', id],
            queryFn: httpFetcher<ApiResult<DmRoom[]>>,
        });
        if (isLoading) {
            return <>loading</>;
        }
        if (isError) {
            return <>{error}
            </>;
        }
        if (!data || !data.data) {
            return <>no data</>;
        }
        return (
            <>
                {
                    data.data.map(item => {
                        const otherUser = item.accountDmRooms.at(-1);
                        if(!otherUser?.account.member){
                            return <>nouser</>
                        }
                        return (
                            <Link href={`/direct/${item.id}`} key={item.id}>
                                <Card key={item.id} className={'m-2'}>
                                    <CardHeader>
                                        <ProfileImageAvatar member={otherUser!.account!.member!} />
                                        <div className={'ml-2'}>
                                            <div className={'flex'}>
                                                <span>{otherUser.account.member?.mbti?.toString()}</span>
                                                <span>{otherUser.account.member?.nickName}</span>
                                            </div>
                                            <div>안녕</div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })
                }
            </>
        )
            ;
    }
;
export default MainContent;