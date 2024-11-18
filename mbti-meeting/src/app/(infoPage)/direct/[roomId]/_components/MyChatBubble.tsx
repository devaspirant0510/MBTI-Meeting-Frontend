'use client';
import Dm from '@/app/_lib/data/entity/Dm';
import { FC } from 'react';
import TimeStamp from '@/app/_components/atom/TimeStamp';

type Props = {
    dm: Dm,
}
const MyChatBubble: FC<Props> = ({ dm }) => {
    return (
        <div className={'flex justify-end mr-2 mt-2'}>
            <div className={'flex items-end'}>
                <TimeStamp time={dm.createdAt} />
                <span className={' bg-pink-200 rounded-2xl p-2 px-4 ml-1'}>
                    {dm.message}
                </span>
            </div>
        </div>
    );
};
export default MyChatBubble;