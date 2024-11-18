import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import ImageIcon from '@mui/icons-material/Image';
import CloseButton from "@/app/(afterLogin)/post/_components/CloseButton";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Article} from "@/app/_lib/data/entity/Article";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default function WritePostForm() {
    const onSumbit = async (formData: FormData) => {
        "use server"
        let isRedirect = false;
        try {
            console.log(cookies().get("accessToken"));
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/article`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookies().get("accessToken")?.value}`,
                },
                body: formData
            })
            const result = await response.json() as ApiResult<Article>;
            console.log(result);
            if (result.success) {
                isRedirect = true;
            } else {

                // 에러메시지
            }
            if(isRedirect){
                redirect("/")
            }
        } catch (e) {
            // 에러메시지
            console.log(e)

        }
        if (isRedirect) {
            redirect("/")
        }
    }
    return (
        <div className={'p-4 flex flex-col'}>
            <div className={'flex items-center mr-2 mb-4'}>
                <CloseButton/>
                <span className={'text-2xl font-bold'}>
                    여러분의 소식이 궁금하데요!
                </span>
            </div>
            <form action={onSumbit}>
                <Textarea name={"content"} classNames={{input: ["bg-transparent"]}} placeholder={"어떤일이 있었나요?"}
                          variant={'bordered'}/>
                <div className={'flex mt-2'}>
                    <ImageIcon style={{color: 'gray'}}/>
                </div>
                <Button type={'submit'} className={'m-2 self-end'}>게시</Button>
            </form>
        </div>
    );
}