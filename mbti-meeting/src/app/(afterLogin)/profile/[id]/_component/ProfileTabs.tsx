import { FC } from 'react';
import ApiResult from '@/app/_lib/data/entity/ApiResult';
import { ArticleLiked } from '@/app/_lib/data/entity/ArticleLiked';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { httpFetcher } from '@/app/_lib/fetcher/httpFetcher';
import { Article } from '@/app/_lib/data/entity/Article';
import { Tab, Tabs } from '@nextui-org/react';
import { Card } from '@nextui-org/card';
import ArticleCard from '@/app/(afterLogin)/_components/ArticleCard';
import { Account } from '@/app/_lib/data/entity/Account';

type Props = {
    id: number
}
const ProfileTabs: FC<Props> = ({ id }) => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['v1', 'auth', 'getUser']) as ApiResult<Account>;
    const { data: likeData } = useQuery({
        queryKey: ['v1', 'member', 'like', user!.data!.id],
        queryFn: httpFetcher <ApiResult<ArticleLiked[]>>,
    });
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['v1', 'article', 'account', id],
        queryFn: httpFetcher <ApiResult<Article[]>>,
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
    return <>
        <section className={'p-2'}>
            <Tabs fullWidth variant={'underlined'}>
                <Tab key={'posts'} title={'게시글'}>
                    {data.data.map(item=>{
                        return <div key={item.id}>
                            <ArticleCard article={item} likes={likeData!.data!}/>
                        </div>

                    })}
                </Tab>
                <Tab key={'comments'} title={'답글'}>
                    <Card>
                        sss
                    </Card>
                </Tab>

            </Tabs>
        </section>
    </>;


};
export default ProfileTabs;