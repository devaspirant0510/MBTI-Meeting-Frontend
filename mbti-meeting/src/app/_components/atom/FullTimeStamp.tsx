import { FC } from 'react';
import dayjs from 'dayjs';

type Props = {
    time: string
}
const TimeStamp: FC<Props> = ({ time }) => {
    const formattedTime = dayjs(time).format('A h:mm YYYY년 MM월 d일').replace('AM', '오전').replace('PM', '오후');
    return (
        <span className={'text-sm text-gray-400'}>
            {formattedTime}
        </span>
    );
};
export default TimeStamp;