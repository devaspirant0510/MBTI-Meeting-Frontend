"use client"
import { Comment } from '@/app/_lib/data/entity/Comment';
import { FC } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import RelativeTime from '@/app/_components/atom/RelativeTime';

type Props ={
    comment:Comment
}
const CommentItem:FC<Props> = ({comment})=>{
    return (
        <Card className={'m-2'}>
            <CardBody >
                <div className={'flex'}>
                    <ProfileImageAvatar member={comment.account.member!} size={'sm'}/>
                    <div className={'ml-2'}>
                        <div className={'flex'}>
                            <div className={'flex items-end'}>
                                <span className={'flex text-gray-500 text-xs'}>{comment.account.member?.mbti}</span>
                                <span>{comment.account.member?.nickName}</span>
                            </div>
                            <RelativeTime date={comment.createdAt} className={'ml-2 text-sm'} />
                        </div>
                        <div>
                            {comment.content}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
export default CommentItem;