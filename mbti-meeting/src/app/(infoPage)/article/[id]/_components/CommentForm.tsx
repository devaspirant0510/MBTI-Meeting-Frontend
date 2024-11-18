'use client';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useCallback, useState } from 'react';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import { getCookie } from 'cookies-next';

type Props = {
    userId: number,
    articleId:number
}
const CommentForm: FC<Props> = ({ articleId }) => {
    const [comment, setComment] = useState('');
    const [isViewSend, setViewSend] = useState(false);
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcher<ApiResult<Account>>,
    });
    console.log("aaaz",data);
    const onChangeComment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            setViewSend(true);
        } else {
            setViewSend(false);
        }
        setComment(e.target.value);
    }, [comment]);
    const onClickCancel = useCallback(()=>{
        setViewSend(false);
        setComment('')
    },[]);
    const onClickConfirm = useCallback(async ()=>{
        const jsonBody= {
            content:comment,
            accountId:data?.data?.id,
            articleId:articleId,
            likeCount:0,
        }
        const accessToken = getCookie('accessToken')
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/comment`,{
            body:JSON.stringify(jsonBody),
            method:'POST',
            headers:{
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })

    },[comment])
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
        <Card className={'p-4 m-2'}>
                <form>
                    <div>
                        <div className={'flex'}>
                            <ProfileImageAvatar member={data.data.member!} size={'md'} />
                            <Input value={comment} onChange={onChangeComment} variant={'underlined'}
                                   placeholder={'댓글 입력'} />
                        </div>
                        {
                            isViewSend ?
                                <div className={'flex justify-end mt-2'}>
                                    <Button size={'sm'} variant={'bordered'} onClick={onClickCancel}>취소</Button>
                                    <Button size={'sm'} color={'primary'} onClick={onClickConfirm}>확인</Button>
                                </div> : <div className={'h-10'}></div>
                        }
                    </div>
                </form>
        </Card>
    );
};
export default CommentForm;