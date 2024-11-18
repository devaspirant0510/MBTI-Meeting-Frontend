import {createClient} from "@/app/_lib/ssr/supabase";
import {cookies} from "next/headers";

export default async function AuthPage(){
    const supabase = createClient(cookies());
    const {data} = await supabase.auth.getSession();
    console.log(data.session?.access_token)


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Hello World with Authenticated Page
        </main>
    );
}