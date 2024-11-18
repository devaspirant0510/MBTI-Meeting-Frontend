'use client';
import { FC, useCallback } from 'react';
import { Button } from '@nextui-org/react';
import { Member } from '@/app/_lib/data/entity/Member';
import { Card } from '@nextui-org/card';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

type Props = {
    member: Member
}
const UserProfile: FC<Props> = ({ member }: Props) => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcher<ApiResult<Account>>,
    });
    const onClickFollow = useCallback(async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/follow/1/${member.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("accessToken")}`,
            },
        });
        console.log(await result.json());

    }, []);
    if (isLoading) {
        return <>loading</>;
    }
    if (!data) {
        return <>nodata</>;
    }
    if (isError) {
        <>{error}</>;
    }
    console.log('member ', data.data);
    return (
        <Link href={`/profile/${member.id}`}>
            <Card className={'p-4 flex justify-center items-center '} style={{ width: '200px' }}>
                <ProfileImageAvatar member={member} />
                <div className={'my-2'}>{member?.nickName}</div>
                {data?.data?.member?.followers?.some(item => {
                    console.log(item, member);
                    return item.follower.id === member.id;
                }) ?
                    <Button disabled>팔로잉</Button>
                    : <Button onClick={onClickFollow}>팔로우</Button>
                }
            </Card>
        </Link>
    );
};
export default UserProfile;