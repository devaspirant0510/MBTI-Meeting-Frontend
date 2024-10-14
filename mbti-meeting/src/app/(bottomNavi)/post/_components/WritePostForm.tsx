"use client"
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";

const WritePostForm = () => {
    return (
        <div>
            <div>
                <span className={'text-2xl font-bold'}>
                    여러분의 소식이 궁금하데요!
                </span>
            </div>
            <Input/>
            <Button className={'m-2'} >게시</Button>
        </div>
    );
}
export default WritePostForm;