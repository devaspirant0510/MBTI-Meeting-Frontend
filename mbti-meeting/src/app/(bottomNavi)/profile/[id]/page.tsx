import {useParams} from "next/navigation";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Member} from "@/app/_lib/data/entity/Member";
import ApiResult from "@/app/_lib/data/entity/ApiResult";

export default async function UserProfilePage() {
    const {id} = useParams()
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['v1', 'member', id], queryFn: httpFetcher<ApiResult<Member>>})
    const dehydrateState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydrateState}>


        </HydrationBoundary>
    )
}