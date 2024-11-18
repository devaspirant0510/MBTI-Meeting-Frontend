'use client';
import { Article } from '@/app/_lib/data/entity/Article';
import { FC, useCallback, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { FavoriteBorder, Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { Account } from '@/app/_lib/data/entity/Account';
import { getCookie } from 'cookies-next';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import RelativeTime from '@/app/_components/atom/RelativeTime';
import Link from 'next/link';
import ArticleList from '@/app/(afterLogin)/_components/ArticleList';
import { httpFetcherServer } from '@/app/_lib/fetcher/httpFetcherServer';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

type Props = {
    article: Article,
    likes: ArticleLiked[]
}
const ArticleCard: FC<Props> = ({ article, likes }: Props) => {
    const queryClient = useQueryClient();
    const [loading,setLoading]= useState(false);
    const like = likes.some(item => item.article.id === article.id);
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    const router = useRouter();
    console.log(user);
    const onClickLike = useCallback(async (e:React.MouseEvent) => {
        e.stopPropagation();
        const accessToken = getCookie('accessToken');
        if (like) {
            // 좋아요 취소
            queryClient.setQueryData<ApiResult<Article[]>>(['v1', 'article'], (data) => {
                const updatedData = data!.data!.map((article) => {
                    // 일치하는 article을 찾아서 likeCount 업데이트
                    if (article.id === article.id) {
                        return {
                            ...article,
                            likeCount: article.likeCount - 1, // likeCount 증가
                        };
                    }
                    return article; // 일치하지 않으면 그대로 반환
                });

                // 새로운 데이터로 반환
                return {
                    ...data,
                    data: updatedData,
                };

            });
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/article/${article.id}/unlike/${user.data?.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                cache: 'no-cache',
            });

        } else {
            // 좋아요

            queryClient.setQueryData<ApiResult<ArticleLiked[]>>(['v1','member','like',user.data?.id],(updater)=>{
                const newArticleLiked: ArticleLiked = {
                    id: updater.data?.length??0,  // 새로 생성할 ID
                    article: article, // 추가하려는 Article 객체
                    account: user!.data!, // 추가하려는 Account 객체
                    likedAt: new Date().toISOString(), // 현재 시간으로 likedAt 설정
                };

                // 기존 캐시 데이터가 있는지 확인 후 추가
                return {
                    ...updater,
                    data: [...(updater?.data || []), newArticleLiked],
                };
            })
            queryClient.setQueryData<ApiResult<Article[]>>(['v1', 'article'], (data) => {
                const updatedData = data!.data!.map((article) => {
                    // 일치하는 article을 찾아서 likeCount 업데이트
                    if (article.id === article.id) {
                        return {
                            ...article,
                            likeCount: article.likeCount+1, // likeCount 증가
                        };
                    }
                    return article; // 일치하지 않으면 그대로 반환
                });

                // 새로운 데이터로 반환
                return {
                    ...data,
                    data: updatedData,
                };

            });
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/article/${article.id}/like/${user.data?.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                cache: 'no-cache',
            });
        }

    }, [like]);
    const onClickArticle = useCallback(()=>{
        router.push(`${location.origin}/article/${article.id}`)
    },[])
    return (
            <Card onClick={onClickArticle}>
                <CardHeader className={'flex justify-between'}>
                    <div className={'flex'}>
                        <ProfileImageAvatar member={article.account.member!} constantSize={45} />
                        <div className={'flex items-end ml-2'}>
                            <span
                                className={'text-sm text-gray-500 mr-1'}>{article.account.member?.mbti?.toString()}</span>
                            <span className={'text-lg font-medium'}>{article.account.member?.nickName}</span>
                        </div>
                    </div>
                    <RelativeTime date={article!.createdAt!} />

                </CardHeader>
                <CardBody>
                    {article.content}
                </CardBody>
                <CardFooter>
                    <div className={'flex mr-3'} onClick={onClickLike}>
                        {like ?
                            <Favorite className={'mr-1'} style={{ color: '#ff5e5e' }} /> :
                            <Button isIconOnly={true} className={'rounded-full'} isLoading={}>
                                <FavoriteBorder className={'mr-1'} />
                            </Button>
                        }
                        <div>{article.likeCount}</div>
                    </div>
                    <div className={'flex mr-3'}>
                        <ChatBubbleOutline />
                        <div>{article.commentCount}</div>
                    </div>
                </CardFooter>
            </Card>
    );

};
export default ArticleCard;