"use client"
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Article} from "@/app/_lib/data/entity/Article";
import {useQuery} from "@tanstack/react-query";
import ArticleCard from "@/app/(bottomNavi)/_components/ArticleCard";

const ProfileTab = () => {
    const {isLoading, isError, error, data} = useQuery({
        queryKey: ['v1', 'article', 'account', 'getAllArticle'],
        queryFn: httpFetcher<ApiResult<Article[]>>
    })

    return (
        <div>
            <nav>
                <div> 게시물</div>
            </nav>
            <div>
                {data?.data?.map(item => {
                    return <div key={item.id}>
                        <ArticleCard article={item}/>
                    </div>
                })}
            </div>
        </div>
    )
}
export default ProfileTab