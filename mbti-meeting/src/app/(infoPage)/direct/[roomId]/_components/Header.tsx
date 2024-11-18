'use client';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@nextui-org/react';
import BackButton from '@/app/_components/atom/BackButton';

type Props = {
    user: number
}
const Header: FC<Props> = ({ user }) => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'auth', user],
        queryFn: httpFetcher<ApiResult<Account>>,
    });
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    return (
        <div>
            <div className={'flex items-center my-2 justify-between'}>
                <div className={'flex items-center'}>
                    <span className={'ml-1'}>
                        <BackButton size={35} />
                    </span>
                        <span className={'ml-1'}>
                        <ProfileImageAvatar member={data.data.member!} />
                    </span>
                    <div className={'flex items-end ml-2'}>
                        <span className={'text-gray-500'}>{data.data.member?.mbti}</span>
                        <span className={'text-2xl'}>{data.data.member?.nickName}</span>
                    </div>
                </div>
                <MenuIcon style={{fontSize:35}} className={'mr-2'}/>
            </div>
            <Divider />
        </div>
    );
};
export default Header;