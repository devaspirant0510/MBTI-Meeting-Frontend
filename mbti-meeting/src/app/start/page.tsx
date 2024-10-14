import MainLogoStatic from "@/app/_components/MainLogoStatic";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export default async function StartPage() {
    return (
        <div className={"flex space-y-4 h-screen items-center flex-col  mx-4"}>
            <MainLogoStatic/>
            <Link href={"/login"}>
                <Button className={"my-4"} style={{background: 'var(--primary1)', color: "white"}} fullWidth>시작하기</Button>
            </Link>
        </div>
    )

}