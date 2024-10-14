import {Member} from "@/app/_lib/data/entity/Member";

export interface Follow{
    id?: number; // id는 선택적으로 설정
    follower: Member; // 팔로워
    following: Member; // 팔로잉
}