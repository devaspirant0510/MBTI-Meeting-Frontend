import {useCallback} from "react";

type Props = {
    state: boolean | null
    value: boolean
    desc: string,
    setValue:(value:boolean|null)=>void
}
const SexButton = ({state, value, desc,setValue}: Props) => {
    const onClickSetMbti = useCallback((value: boolean | null) => {
        setValue(value)
    }, []);
    if (state === null) {
        return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center text-xl"}
                    style={{width: '180px', height: "180px", background: 'var(--primary3)',borderRadius:'40px'}}>
            <div>
                {desc}
            </div>
        </div>
    } else if (state === value) {
        return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center text-2xl font-bold"}
                    style={{width: '180px', height: "180px", background: 'var(--primary5)',borderRadius:'40px'}}>
            <div>
                {desc}
            </div>
        </div>

    }
    return <div onClick={() => onClickSetMbti(value)} className={"flex flex-col text-center items-center justify-center text-xl"}
                style={{width: '180px', height: "180px", background: 'var(--primary3)',borderRadius:'40px'}}>
        <div>
            {desc}
        </div>
    </div>
}
export default SexButton;