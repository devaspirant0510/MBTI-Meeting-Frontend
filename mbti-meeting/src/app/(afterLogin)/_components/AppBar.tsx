
import {Search,Notifications} from "@mui/icons-material"
const AppBar = ()=>{
    return (
        <div className={"flex justify-between p-2"} style={{width:'100%'}}>
            <span className={'text-3xl font-black flex-1'}>MBTI Meeting</span>
            <div className={'flex'}>
                <Search style={{fontSize:50}}/>
                <Notifications style={{fontSize:50}}/>
            </div>
        </div>
    )
}
export default AppBar;