import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import WritePostForm from "@/app/(bottomNavi)/post/_components/WritePostForm";

export default async function PostNewPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['v1','auth','getUser']})
    const dehydrateState = dehydrate(queryClient)
    return (
        <HydrationBoundary state={dehydrateState}>
            <WritePostForm/>
        </HydrationBoundary>
    );
}