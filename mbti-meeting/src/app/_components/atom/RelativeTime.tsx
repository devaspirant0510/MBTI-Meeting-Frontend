import { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = {
    date: string,
    className?: string
}
const RelativeTime: FC<Props> = ({ date,className }) => {
    return <span className={className??className}>
        {dayjs(date).fromNow()}
    </span>
}
export default RelativeTime;