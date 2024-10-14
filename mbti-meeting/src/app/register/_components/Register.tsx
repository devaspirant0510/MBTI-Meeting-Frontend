"use client"

import PolicyPage from "../_pages/PolicyPage";
import MbtiQuestionPage from "@/app/register/_pages/MbtiQuestionPage";
import {useRegisterStore} from "@/app/_lib/store/registerStore";
import MbtiSettingPage from "@/app/register/_pages/MbtiSettingPage";
import ProfileFormPage from "@/app/register/_pages/ProfileFormPage";
import ProfileSettingPage from "@/app/register/_pages/ProfileSettingPage";

const Register = () => {
    const {page} = useRegisterStore();
    if (page === 0) {
        return <PolicyPage></PolicyPage>;
    }
    else if(page===1){
        return <MbtiQuestionPage/>;
    }
    else if(page===2){
        return <MbtiSettingPage/>;
    }
    else if(page===3){
        return <ProfileFormPage/>
    }
    return (
        <ProfileSettingPage/>
    )
}
export default Register;