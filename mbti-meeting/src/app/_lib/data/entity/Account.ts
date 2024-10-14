// Role Enum
import {Member} from "@/app/_lib/data/entity/Member";

export enum Role {
    User = 'User',
    Admin = 'Admin',
    // 필요에 따라 Role 추가 가능
}

// Account 타입 정의
export interface Account {
    id?: number;
    provider: string;
    uid: string;
    email?: string | null;
    role: Role;
    createdAt?: Date;
    member?: Member;  // Member 타입과 연결
}