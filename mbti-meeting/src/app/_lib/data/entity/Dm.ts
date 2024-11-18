import { Account } from '@/app/_lib/data/entity/Account';
import { DmRoom } from '@/app/_lib/data/entity/DmRoom';

export enum MessageType {
    TEXT,
    IMAGE,
    SYSTEM
}

export default interface Dm {
    id: number | null;           // 메시지 ID
    sender: Account;             // 보낸 사람 정보 (Account 타입)
    dmRoom: DmRoom;              // DM 방 정보 (DmRoom 타입)
    message: string;             // 메시지 내용
    messageType: MessageType;    // 메시지 타입 (MessageType Enum 타입)
    createdAt: string;           // 생성 시간, ISO 8601 형식의 문자열로 표현
}