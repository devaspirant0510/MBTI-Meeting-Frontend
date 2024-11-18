"use client"
import {useQuery} from "@tanstack/react-query";
import ApiResult from "@/app/_lib/data/entity/ApiResult";
import {Account} from "@/app/_lib/data/entity/Account";
import {httpFetcher} from "@/app/_lib/fetcher/httpFetcher";
import {Button, Divider, useDisclosure} from "@nextui-org/react";
import ProfileImageAvatar from "@/app/_components/atom/ProfileImageAvatar";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import React, {useCallback, useState} from "react";
import {getCookie} from "cookies-next";

const UpdateProfile = () => {
    const {isLoading, isError, error, data, refetch} = useQuery({
        queryKey: ['v1', 'auth', 'getUser'],
        queryFn: httpFetcher<ApiResult<Account>>
    });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target?.files[0];
            setFile(selectedFile);
            setPreview(true)
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };
    const onClickUpload = useCallback(async (onClose: () => void) => {
        const form = new FormData();
        if(!file){
            throw Error("사진을 업로드해주세요")
        }
        form.append("file", file);
        console.log(form,file)
        const a =getCookie("accessToken")
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/upload`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${a}`,
            },
            body: form as FormData,
        })
        const responseJson = await response.json() as ApiResult<Account>;
        console.log(responseJson.data?.member?.profileImage)
        if (responseJson.success) {
            await refetch();
            alert("업로드 성공")
        } else {
            alert("실패");
        }
        onClose();

    }, [file]);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data || !data?.data || !data.data.member) {
        return <>nodata</>
    }
    return (
        <div className={'flex flex-col'}>
            <h1 className={'text-2xl'}>프로필 편집</h1>
            <div className={'flex'}>
                <div className={'flex flex-col'}>
                    <span>닉네임</span>
                    <input/>
                </div>
                <div className={"flex flex-col items-center"}>
                    <ProfileImageAvatar member={data.data.member}/>
                    <Button onClick={onOpen}>프로필편집</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">프로필 이미지 변경</ModalHeader>
                                    <ModalBody>
                                        <div className={'flex flex-col'}>
                                            {preview ? <img src={previewUrl!}/> : data?.data?.member &&
                                                <ProfileImageAvatar member={data.data.member}/>}
                                            <input type={'file'} onChange={handleFileChange}/>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose} fullWidth>
                                            취소
                                        </Button>
                                        <Button color="primary" onPress={() => onClickUpload(onClose)} fullWidth>
                                            업로드
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
            <Divider/>
        </div>
    )
}
export default UpdateProfile;