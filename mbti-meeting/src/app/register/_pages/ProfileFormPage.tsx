import {useRegisterStore} from "@/app/_lib/store/registerStore";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import {useCallback} from "react";
import SexButton from "@/app/register/_components/SexButton";

export default function ProfileFormPage() {
    const {profilePageStep, setProfilePageStep, mbti1, mbti2, mbti3, mbti4,sex,setSex,setPage} = useRegisterStore();
    const onClickNextButton = useCallback(() => {
        if (profilePageStep==2){
            setPage(4);

        }else{
            setProfilePageStep(profilePageStep + 1)
        }
    }, [profilePageStep]);
    return (
        <div className={"flex flex-col p-4 justify-between content-between h-screen"}>
            <div>
                <span className={"text-xl font-bold"}>닉네임</span>
                <Input startContent={<span>{mbti1}{mbti2}{mbti3}{mbti4}</span>} variant={'faded'}
                       style={{backgroundColor: 'white'}} size={'lg'}/>
                {profilePageStep > 0 &&
                    <div className={"mt-4"}>
                        <span className={"text-xl font-bold"}>성별</span>
                        <div className={"flex items-center justify-evenly"}>
                            <SexButton state={sex} value={true} desc={"남자"} setValue={setSex}/>
                            <SexButton state={sex} value={false} desc={"여자"} setValue={setSex}/>

                        </div>
                    </div>
                }
            </div>
            <Button onClick={onClickNextButton} style={{background: 'var(--primary1)', color: 'var(--primary4)'}}>
                다음
            </Button>
        </div>
    );
}