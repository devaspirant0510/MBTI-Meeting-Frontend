import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import {CloseIcon} from "@nextui-org/shared-icons";
import ImageIcon from '@mui/icons-material/Image';
import CloseButton from "@/app/(bottomNavi)/post/_components/CloseButton";
import {FormEvent} from "react";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Article} from "@/app/_lib/data/entity/Article";
import {redirect} from "next/navigation";

export default function WritePostForm() {
    const onSumbit = async (formData: FormData) => {
        "use server"
        let isRedirect = false;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/article`, {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NWEyNTcwOC1lNDBiLTRjOGUtOTgzYy0wZTI2NWJmNjY1MzMiLCJpYXQiOjE3Mjg5ODM4MzEsImV4cCI6MjA0NDM0MzgzMSwiaWQiOjEsInByb3ZpZGVyIjoia2FrYW8iLCJlbWFpbCI6Im5vdmEwMjA1MTBAbmF2ZXIuY29tIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0wNFQxMDoyMTozOS4yNDMyMTQiLCJtZW1iZXIiOnsiaWQiOjEsIm5pY2tOYW1lIjoi7J247YWU65ah7IOB6riw7JuQM-uFhOywqCIsIm1idGkiOiJJTlRQIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0wNFQxMDoyMTo0My42NDk0NTEiLCJwcm9maWxlSW1hZ2UiOnsiaWQiOjEsImZpbGUiOnsiaWQiOjEsInByb2ZpbGVVcmwiOiIvVXNlcnMva290bGluYW5kbm9kZS9zZXVuZ2hvL3VwbG9hZHMv4YSJ4YWz4YSP4YWz4YSF4YW14Yar4YSJ4YWj4Ya6IDIwMjQtMTAtMDIg4YSL4YWp4YSS4YWuIDExLjE1LjI0LnBuZyIsImNyZWF0ZWRBdCI6bnVsbH19fX0.xhWYyDZ0aGNUiMqKvoNbpx-JPp1zEp7cp8AOZSQ8pBI"
                },
                body: formData
            })
            const result = await response.json() as ApiResult<Article>;
            if (result.success) {
                isRedirect = true;
            } else {
                // 에러메시지
            }
            if(isRedirect){
                redirect("/")
            }
        } catch (e: Error) {
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