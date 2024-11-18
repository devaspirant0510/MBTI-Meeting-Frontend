'use client';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import BackButton from '@/app/_components/atom/BackButton';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import { Article } from '@/app/_lib/data/entity/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FullTimeStamp from '@/app/_components/atom/FullTimeStamp';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ChatBubbleOutline, Favorite, FavoriteBorder } from '@mui/icons-material';
import CommentList from '@/app/(infoPage)/article/[id]/_components/CommentList';
import CommentForm from '@/app/(infoPage)/article/[id]/_components/CommentForm';

type Props = {
    id: number,
    userId:number
}
const ArticleInfo: FC<Props> = ({ id,userId }) => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'article', id],
        queryFn: httpFetcher<ApiResult<Article>>,
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
    console.log("aaaa : ",data.data.account.member);

    return (
        <div className={'flex flex-col'}>
            <div className={'flex items-center my-2 justify-between'}>
                <BackButton />
                <div>MBTI Meeting</div>
                <MoreVertIcon className={'mr-2'} />
            </div>
            <Card className={'p-2 m-2'}>
                <CardHeader>
                    <div className={'flex items-center'}>
                        <ProfileImageAvatar member={data.data.account.member!} size={'md'} />
                        <div>
                            <div className={'flex items-end'}>
                                <span className={'ml-2 text-sm text-gray-500'}>{data.data.account.member?.mbti}</span>
                                <span className={'ml-1 text-xl'}>{data.data.account.member?.nickName}</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <article className={'mt-2'}>
                        {data.data.content}
                    </article>
                </CardBody>
                <CardFooter>
                    <div>
                        <FullTimeStamp time={data.data.createdAt} />
                        <div className={'flex'}>
                            <div className={'flex mr-3'} onClick={() => {
                            }}>
                                {true ?
                                    <Favorite className={'mr-1'} style={{ color: '#ff5e5e' }} /> :
                                    <FavoriteBorder className={'mr-1'} />
                                }
                                <div>{data.data.likeCount}</div>
                            </div>

                            <div className={'mr-3 flex'}>
                                <ChatBubbleOutline  className={'mr-1'}/>
                                <div>{data.data.commentCount}</div>
                            </div>
                        </div>

                    </div>

                </CardFooter>
            </Card>
            <div className={'flex justify-start ml-3'}>
                댓글 {data.data.commentCount} 개
            </div>
            <CommentForm userId={userId} articleId={id}/>
            <CommentList id={id}/>
        </div>
    );
};
export default ArticleInfo;