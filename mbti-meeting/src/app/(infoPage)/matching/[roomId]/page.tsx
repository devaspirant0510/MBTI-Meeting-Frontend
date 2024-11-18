import { Button, Divider } from '@nextui-org/react';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SmsIcon from '@mui/icons-material/Sms';
export default function Page() {
    return <div className={'flex flex-col items-center h-screen'}>
        <div className={'text-center text-4xl font-bold py-2 '}>
            MBTI MEETING
        </div>
        <Divider />
        <div className={'flex flex-col items-center justify-center flex-grow'}>
            <div style={{ width: 180, height: 180 }}
                 className={'flex bg-gray-200 rounded-full border-green-500 border-4 justify-center items-center mb-14'}>
                <div className={'text-4xl font-bold '}>INFP</div>
            </div>
            <div>

            </div>
            <div style={{ width: 180, height: 180 }}
                 className={'flex bg-gray-700 rounded-full border-green-500 border-4 justify-center items-center mt-14'}>
                <div className={'text-4xl font-bold text-white '}>INTP</div>
            </div>
            <div style={{ width: 50, height: 30, transform: 'translateY(-15px)' }}
                 className={'flex justify-center items-center bg-red-500 text-white font-bold text-sm rounded-3xl text-center mb-2 border-white border-1'}>me
            </div>
        </div>
        <Divider />
        <div className={'flex  items-center'}>
            <Button isIconOnly={true} className={'rounded-full'}>
                <SmsIcon/>
            </Button>
            <Button isIconOnly={true} color={'danger'} className={'rounded-full mx-10 my-2'} size={'lg'} >
                <PhoneDisabledIcon style={{fontSize:'30px'}}/>
            </Button>
            <Button isIconOnly={true} className={'rounded-full'}>
                <KeyboardVoiceIcon/>
            </Button>
        </div>
    </div>;

}