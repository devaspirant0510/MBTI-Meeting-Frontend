"use client"
import {useQuery} from "@tanstack/react-query";
import {Article} from "@/app/_lib/data/entity/Article";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ArticleCard from "@/app/(bottomNavi)/_components/ArticleCard";
import {Divider} from "@nextui-org/react";

const ArticleList = () => {
    const {isLoading, isError, error, data} = useQuery({
        queryKey: ['v1', 'article',],
        queryFn: httpFetcher<ApiResult<Article[]>>
    });
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data) {
        return <>nodata</>
    }
    console.log(data)
    return (
        <div>
            {data.data?.map((article: Article) => {
                return <div key={article.id} className={'mb-2'}>
                    <ArticleCard article={article}/>
                </div>
            })}

        </div>
    )
}
export default ArticleList