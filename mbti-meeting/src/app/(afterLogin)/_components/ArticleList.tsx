"use client"
import {useQuery} from "@tanstack/react-query";
import {Article} from "@/app/_lib/data/entity/Article";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ArticleCard from "@/app/(afterLogin)/_components/ArticleCard";
import { Skeleton } from '@nextui-org/react';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';
import { FC } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

type Props = {
    accountId:number
}
const ArticleList:FC<Props> = ({accountId}) => {
    const {isLoading:isLikedLoading,data:likeData} = useQuery({
        queryKey:['v1','member','like',accountId],
        queryFn:httpFetcher<ApiResult<ArticleLiked[]>>
    })
    const {isLoading, isError, error, data} = useQuery({
        queryKey: ['v1', 'article',],
        queryFn: httpFetcher<ApiResult<Article[]>>
    });
    if (isLoading || isLikedLoading) {
        return <div>
            <Card className={'m-2'}>
                <CardHeader>
                    <Skeleton className={'w-12 h-12 rounded-full mr-2'}/>
                    <div>
                        <Skeleton className={'w-32 h-4 rounded-full mb-1'}/>
                        <Skeleton className={'w-24 h-4 rounded-full'}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <Skeleton className={'w-36 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-52 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-28 h-4 rounded-full mb-2'}/>
                    </div>
                </CardBody>

            </Card>
            <Card className={'m-2'}>
                <CardHeader>
                    <Skeleton className={'w-12 h-12 rounded-full mr-2'}/>
                    <div>
                        <Skeleton className={'w-32 h-4 rounded-full mb-1'}/>
                        <Skeleton className={'w-24 h-4 rounded-full'}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <Skeleton className={'w-36 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-52 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-28 h-4 rounded-full mb-2'}/>
                    </div>
                </CardBody>

            </Card>
            <Card className={'m-2'}>
                <CardHeader>
                    <Skeleton className={'w-12 h-12 rounded-full mr-2'}/>
                    <div>
                        <Skeleton className={'w-32 h-4 rounded-full mb-1'}/>
                        <Skeleton className={'w-24 h-4 rounded-full'}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <Skeleton className={'w-36 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-52 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-28 h-4 rounded-full mb-2'}/>
                    </div>
                </CardBody>

            </Card>
            <Card className={'m-2'}>
                <CardHeader>
                    <Skeleton className={'w-12 h-12 rounded-full mr-2'}/>
                    <div>
                        <Skeleton className={'w-32 h-4 rounded-full mb-1'}/>
                        <Skeleton className={'w-24 h-4 rounded-full'}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <Skeleton className={'w-36 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-52 h-4 rounded-full mb-2'}/>
                        <Skeleton className={'w-28 h-4 rounded-full mb-2'}/>
                    </div>
                </CardBody>

            </Card>

        </div>
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data || !likeData) {
        return <>nodata</>
    }
    console.log(data)
    return (
        <div>
            {data.data?.map((article: Article) => {
                return <div key={article.id} className={'mb-2'}>
                    <ArticleCard article={article} likes={likeData.data!}/>
                </div>
            })}

        </div>
    )
}
export default ArticleList