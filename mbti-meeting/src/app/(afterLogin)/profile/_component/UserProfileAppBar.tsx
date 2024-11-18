"use client"
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";

const UserProfileAppBar = () =>{
    const {id} = useParams();
    const {} = useQuery({queryKey:['v1','member',id]})
    return (
        <></>
    )
}
export default UserProfileAppBar;