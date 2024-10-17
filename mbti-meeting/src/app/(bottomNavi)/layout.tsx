import HomeIcon from '@mui/icons-material/Home';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";

export default function BottomNavLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={'flex flex-col h-screen'}>
            <div className={'flex-1 overflow-auto'}>
                {children}
            </div>
            <div className={'p-2 flex justify-evenly items-center'}>
                <Link href={'/'}>
                    <HomeIcon style={{fontSize: 50}}/>
                </Link>
                <InterpreterModeIcon style={{fontSize: 50}}/>
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