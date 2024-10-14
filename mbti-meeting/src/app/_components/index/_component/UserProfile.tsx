import {FC} from "react";
import {Avatar, Button} from "@nextui-org/react";
import {Member} from "@/app/_lib/data/entity/Member";
import {Card} from "@nextui-org/card";

type Props = {
    member:Member
}
const UserProfile:FC<Props> = ({member}:Props)=>{
    return (
        <Card className={'p-4 flex justify-center items-center '} >
            <Avatar size={"lg"} name={member.mbti?.toString()}>
            </Avatar>
            <div>{member?.nickName}</div>
            <Button>팔로우</Button>
        </Card>
    )
}
export default UserProfile