"use client"
import { Input } from '@nextui-org/input';

import { AddCircleOutlined, SendRounded } from '@mui/icons-material';
import { FC, FormEvent } from 'react';
import { getCookie } from 'cookies-next';

type Props = {
    roomId: number,
    userId: number
}
const ChatForm: FC<Props> = ({ roomId, userId }) => {
    const onClickSendButton = async (event: FormEvent) => {
        event.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/dm/send/${roomId}`, {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${getCookie('accessToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messageType: 'TEXT',
                message: form.get('content'),
                dmRoomId: roomId,
                senderId: userId,
            }),
        });
    };
    return (
        <form onSubmit={onClickSendButton} className={'flex items-center mx-2 mb-1'}>
            <AddCircleOutlined style={{fontSize:35}}/>
            <Input name={'content'} variant="bordered" color={'primary'} className={'mx-2'} autoComplete={'off'}/>
            <button type={'submit'}>
                <SendRounded style={{fontSize:35}}/>
            </button>
        </form>
    );
};
export default ChatForm;