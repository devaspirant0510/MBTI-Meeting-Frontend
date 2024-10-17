import {Avatar} from "@nextui-org/react";
import {Member} from "@/app/_lib/data/entity/Member";
import {FC} from "react";

type Props = {
    member: Member
}
const ProfileImageAvatar: FC<Props> = ({member}) => {
    if (member.profileImage) {
        return (
            <Avatar size={"lg"} name={member.mbti?.toString()} src={member.profileImage?.file.profileUrl}/>
        )
    }
    return (
        <Avatar size={"lg"} name={member.mbti?.toString()}/>
    )
}

export default ProfileImageAvatar;