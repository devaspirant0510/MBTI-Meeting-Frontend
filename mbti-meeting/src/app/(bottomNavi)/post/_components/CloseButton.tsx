"use client"
import {useCallback} from "react";
import {CloseIcon} from "@nextui-org/shared-icons";
import {IconButton} from "@mui/material";
import {useRouter} from "next/navigation";

const CloseButton = ()=>{
    const router = useRouter()
    const onClickBackButton = useCallback(()=>{
        router.back();
    },[])
    return (
        <IconButton onClick={onClickBackButton}>
            <CloseIcon fontSize={30}/>
        </IconButton>
    )
}
export default CloseButton;