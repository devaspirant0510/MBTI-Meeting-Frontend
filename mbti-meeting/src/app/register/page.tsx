import Register from "@/app/register/_components/Register";
import {supabase} from "@/app/_lib/supabseUtils";

export default async function RegisterPage(){
    const { data: user, error } = await supabase.auth.getUser();
    console.log(user);
    console.log(error)
    return (
        <>
            <Register/>
        </>
    );
}