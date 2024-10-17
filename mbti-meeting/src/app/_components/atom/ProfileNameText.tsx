import {Member} from "@/app/_lib/data/entity/Member";
import {FC} from "react";

type Props = {
    member:Member|undefined
}
const ProfileNameText:FC<Props> = ({member})=>{
    if(!member) return <>noName</>
    return (
        <div className={'flex items-end'}>
            <span className={'text-gray-500 text-xs'}>{member.mbti}</span>
            <span className={'text-2xl'}>{member.nickName}</span>
        </div>
    )
}
export default ProfileNameText;