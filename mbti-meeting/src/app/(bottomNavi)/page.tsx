import ReccomendUser from "@/app/_components/index/ReccomendUser";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Account} from "@/app/_lib/data/entity/Account";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import AppBar from "@/app/(bottomNavi)/_components/AppBar";
import {Divider} from "@nextui-org/react";
import {Article} from "@/app/_lib/data/entity/Article";
import ArticleList from "@/app/(bottomNavi)/_components/ArticleList";

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['v1', 'member', 'recommend'],
        queryFn: httpFetcher<ApiResult<Account[]>>
    });
    await queryClient.prefetchQuery({queryKey: ['v1', 'article',], queryFn: httpFetcher<ApiResult<Article[]>>});
    const queries = dehydrate(queryClient)

    return (
        <HydrationBoundary state={queries}>
            <AppBar/>
            <Divider/>
            <div className={""}>
                <main className={'w-full flex justify-center flex-col items-center p-2 h-screen'}>
                    <div className={'mt-2 flex-1 w-full overflow-y-auto'}>
                        <div className={'text-xl font-bold text-left self-start mb-2 '}>이런 사람 어때?</div>
                        <article className={'mt-2'}>
                            <ReccomendUser/>
                        </article>
                        <article className={'mt-4'}>
                            <ArticleList/>
                        </article>
                    </div>
                </main>


            </div>
        </HydrationBoundary>
    );

}
