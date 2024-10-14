import {useCallback, useState} from "react";
import {useRegisterStore} from "@/app/_lib/store/registerStore";

type Props = {
    state: string | null
    value: string
    desc: string,
    setValue:(value:string|null)=>void
}
const MbtiButton = ({state, value, desc,setValue}: Props) => {
    const onClickSetMbti = useCallback((value: string | null) => {
        setValue(value)
    }, []);
    if (state === null) {
        return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center"}
                    style={{width: '180px', height: "180px", background: 'var(--primary3)',borderRadius:'40px'}}>
            <div>
                {desc}
            </div>
            <div>
                {value}
            </div>
        </div>
    } else if (state === value) {
        return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center"}
                    style={{width: '180px', height: "180px", background: 'var(--primary5)',borderRadius:'40px'}}>
            <div>
                {desc}
            </div>
            <div>
                {value}
            </div>
        </div>

    }
    return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center"}
                style={{width: '180px', height: "180px", background: 'var(--primary3)',borderRadius:'40px'}}>
        <div>
            {desc}
        </div>
        <div>
            {value}
        </div>
    </div>
}
export default MbtiButton;