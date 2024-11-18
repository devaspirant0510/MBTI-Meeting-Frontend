import HomeIcon from '@mui/icons-material/Home';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function BottomNavLayout({children}: {
    children: React.ReactNode
}) {
    if(!cookies().get("accessToken")){
        redirect('/login');
    }
    return (
        <div className={'flex flex-col h-screen'}>
            <div className={'flex-1 overflow-auto'}>
                {children}
            </div>
            <div className={'p-2 flex justify-evenly items-center'}>
                <Link href={'/'}>
                    <HomeIcon style={{fontSize: 50}}/>
                </Link>
                <Link href={'/matching'}>
                    <InterpreterModeIcon style={{fontSize: 50}}/>
                </Link>
                <Link href={'/post/new'}>
                    <AddCircleOutlineIcon style={{fontSize: 50}}/>
                </Link>
                <Link href={"/direct"}>
                    <ChatBubbleIcon style={{fontSize: 50}}/>
                </Link>
                <Link href={"/profile/my"}>
                    <PersonIcon style={{fontSize: 50}}/>
                </Link>
            </div>

        </div>
    )

}