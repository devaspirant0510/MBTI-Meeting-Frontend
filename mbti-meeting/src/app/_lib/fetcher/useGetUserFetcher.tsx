import {supabase} from "@/app/_lib/supabseUtils";
import {useQuery} from "@tanstack/react-query";

async function getUserSupabase() {
    return supabase.auth.getSession()
}

export const useGetUserFetcher = () => {
    const {isError,error,data} = useQuery({queryKey: ['getUser'], queryFn: getUserSupabase})
    if(isError){
        throw error
    }
    return data
}