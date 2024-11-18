import Dm from '@/app/_lib/data/entity/Dm';
import { FC } from 'react';
import ProfileImageAvatar from '@/app/_components/atom/ProfileImageAvatar';
import TimeStamp from '@/app/_components/atom/TimeStamp';

type Props = {
    dm: Dm
}
const OtherChatBubble: FC<Props> = ({ dm }) => {
    return (
        <div className={'flex mt-2 ml-2'}>
            <ProfileImageAvatar member={dm!.sender!.member!} size={'md'} />
            <div className={'flex flex-col'}>
                <div className={'ml-1 flex items-end'}>
                    <span className={'text-xs'}>{dm.sender.member?.mbti}</span>
                    <span>{dm.sender.member?.nickName}</span>
                </div>
                <div className={'flex items-end'}>
                    <span className={'rounded-2xl bg-gray-300 p-2 px-4'}>
                        {dm.message}
                    </span>
                    <span className={'ml-1'}>
                        <TimeStamp time={dm.createdAt}/>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default OtherChatBubble;