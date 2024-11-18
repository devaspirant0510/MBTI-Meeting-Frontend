"use client"
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Article} from "@/app/_lib/data/entity/Article";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArticleCard from "@/app/(afterLogin)/_components/ArticleCard";
import { Account } from '@/app/_lib/data/entity/Account';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';
import { Tab, Tabs } from '@nextui-org/react';

const ProfileTab = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    const {data:likeData} = useQuery({
        queryKey: ['v1', 'member', 'like', user.data?.id],
        queryFn: httpFetcher <ApiResult<ArticleLiked[]>>,
    });
    const { data} = useQuery({
        queryKey: ['v1', 'article', 'account', 'getAllArticle'],
        queryFn: httpFetcher<ApiResult<Article[]>>
    })
    if(!likeData || !likeData.data){
        return <>nodata</>
    }

    return (
        <nav>
            <Tabs fullWidth variant={'underlined'}>
                <Tab key={"posts"} title={"게시물"}>
                    <main>
                        {data?.data?.map(item => {
                            return <div className={'m-2'} key={item.id}>
                                <ArticleCard article={item} likes={likeData.data!} />
                            </div>
                        })}
                    </main>
                </Tab>
                <Tab key={"comments"} title={"답글"}>

                </Tab>
            </Tabs>
        </nav>
    )
}
export default ProfileTab