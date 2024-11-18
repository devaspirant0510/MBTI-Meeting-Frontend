import { FC } from 'react';
import dayjs from 'dayjs';

type Props = {
    time: string
}
const TimeStamp: FC<Props> = ({ time }) => {
    const formattedTime = dayjs(time).format('A h:mm').replace('AM', '오전').replace('PM', '오후');
    return (
        <span className={'text-xs'}>
            {formattedTime}
        </span>
    );
};
export default TimeStamp;