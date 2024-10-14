// Mbti Enum
import {Follow} from "@/app/_lib/data/entity/Follow";

export enum Mbti {
    INFP = 'INFP',
    ENFP = 'ENFP',
    // 필요에 따라 MBTI 타입 추가 가능
}

// Member 타입 정의
export interface Member {
    id?: number;
    nickName?: string | null;
    mbti?: Mbti | null;
    createdAt?: Date;
    profileImage?: never//ProfileImage | null;  // ProfileImage 타입과 연결
    followings?: Follow[];  // 팔로우한 사람들
    followers?: Follow[];   // 나를 팔로우하는 사람들
}