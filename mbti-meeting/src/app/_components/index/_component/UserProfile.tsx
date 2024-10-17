"use client"
import {FC, useCallback} from "react";
import {Avatar, Button} from "@nextui-org/react";
import {Member} from "@/app/_lib/data/entity/Member";
import {Card} from "@nextui-org/card";
import ProfileImageAvatar from "@/app/_components/atom/ProfileImageAvatar";

type Props = {
    member: Member
}
const UserProfile: FC<Props> = ({member}: Props) => {
    const onClickFollow = useCallback(async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/follow/1/${member.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.NEXT_PUBLIC_MASTER_TOKEN
            }
        })
        console.log(await result.json())

    }, []);
    return (
        <Card className={'p-4 flex justify-center items-center '} style={{width: '200px'}}>
            <ProfileImageAvatar member={member}/>
            <div className={"my-2"}>{member?.nickName}</div>
            <Button onClick={onClickFollow}>팔로우</Button>
        </Card>
    )
}
export default UserProfile