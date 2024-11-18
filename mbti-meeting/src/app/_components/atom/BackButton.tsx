"use client"
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import { ArrowBack } from '@mui/icons-material';

type Props = {
    size?: number
}
const BackButton: FC<Props> = ({ size }) => {
    const router = useRouter();
    const onClickButton = useCallback(() => {
        router.back();
    }, []);
    return (
        <ArrowBack  onClick={onClickButton} style={{fontSize:size}}/>
    );
};
export default BackButton;