"use client"
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';

const Header = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcher<ApiResult<Account>>,
    });
    if (isLoading) {
        return <>loading</>;
    }
    if(isError){
        return <>{error}</>
    }
    if(!data || !data.data){
        return <>nodata</>;
    }
    return (
        <div className={'flex'}>
            <span>{data.data.member?.mbti?.toString()}</span>
            <span>{data.data.member?.nickName}</span>
        </div>
    );
};
export default Header;