'use client';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Member } from '@/app/_lib/data/entity/Member';
import { useQuery } from '@tanstack/react-query';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import Link from 'next/link';
import { Button, Divider } from '@nextui-org/react';
import BackButton from '@/app/_components/atom/BackButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProfileTabs from '@/app/(afterLogin)/profile/[id]/_component/ProfileTabs';

type Props = {
    id: number
}
const OtherProfile = ({ id }: Props) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['v1', 'member', id],
        queryFn: httpFetcher<ApiResult<Member>>,

    });
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data || !data.data) {
        return <>no data</>;
    }
    return (
        <>

            <div className={'flex justify-between py-3 px-2'}>
                <BackButton />
                <div className={'flex items-end'}>
                    <div className={'text-xs text-gray-500'}>{data.data?.mbti?.toString()}</div>
                    <div className={'text-xl font-bold'}>{data.data?.nickName?.toString()}</div>
                </div>
                <MoreVertIcon />
            </div>
            <Divider />
            <div className={'flex justify-between items-start mt-2 p-2'}>
                <div className={'flex items-start flex-col'}>
                    <div className={'text-xl text-gray-500'}>{data.data?.mbti?.toString()}</div>
                    <div className={'text-3xl font-bold'}>{data.data?.nickName?.toString()}</div>
                </div>
                <div>
                    <ProfileImageAvatar member={data.data!} constantSize={100} />

                </div>
            </div>
            <main className={'p-2'}>
                <Link href={`/profile/${id}/follows`}>
                    <aside>
                        <div className={'flex items-center'}>
                <span className={'text-xl font-bol mr-2'}>
                    팔로우
                </span>
                            <div className={''}>
                                {data.data?.followers?.length}
                            </div>
                        </div>
                        <div className={'flex items-center'}>
                            <span className={'text-xl font-bol mr-2'}>팔로잉</span>
                            <div className={''}>
                                {data.data?.followings?.length}
                            </div>
                        </div>
                    </aside>
                </Link>
                <div className={'flex'}>
                    <Button fullWidth>팔로우</Button>
                    <Button fullWidth>메시지 보내기</Button>
                </div>
            </main>
            <ProfileTabs id={data.data.id!}/>
        </>
    );
};
export default OtherProfile;