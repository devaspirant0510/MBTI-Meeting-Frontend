"use client"
import {FC, ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
    children: ReactNode;
}
const RQProvider: FC<Props> = ({children}: Props) => {
    const [queryClient] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false
            }
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={true}
            />
        </QueryClientProvider>
    );
}
export default RQProvider;