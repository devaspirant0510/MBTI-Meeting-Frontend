"use client"
import { useQuery } from '@tanstack/react-query';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { FC } from 'react';
import CommentItem from '@/app/(infoPage)/article/[id]/_components/CommentItem';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import { Comment } from '@/app/_lib/data/entity/Comment';

type Props = {
    id: number,
}
const CommentList: FC<Props> = ({ id }) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['v1', 'comment', 'article', id],
        queryFn: httpFetcher<ApiResult<Comment[]>>,
    });
    if (isLoading) {
        return (
            <>loading</>
        );
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    return (
        <div>
            {data.data.map(comment=>{
                return <div key={comment.id}>
                    <CommentItem comment={comment}/>
                </div>

            })}

        </div>
    );
};
export default CommentList;