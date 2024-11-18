import AccountDmRoom from '@/app/_lib/data/entity/AccountDmRoom';

export interface DmRoom {
    id: number | null;
    roomName: string;
    createdAt: string | null; // LocalDateTime is typically represented as a string in TypeScript
    accountDmRooms: AccountDmRoom[];
}