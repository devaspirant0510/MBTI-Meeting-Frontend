import { Account } from '@/app/_lib/data/entity/Account';
import { DmRoom } from '@/app/_lib/data/entity/DmRoom';
export enum DmRoleType{
    OWNER,
    PARTICIPATE
}
export default interface AccountDmRoom {
    id: number | null;
    joinedAt: string; // LocalDateTime is represented as a string in TypeScript
    account: Account;
    dmRoom: DmRoom;
    role: DmRoleType;
}