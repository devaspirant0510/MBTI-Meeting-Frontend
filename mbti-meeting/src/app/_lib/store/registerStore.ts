// store.ts
import {create} from 'zustand';

type Store = {
    page: number;
    setPage: (newPage: number) => void;
    mbti1: string | "I" | "E" | null;
    setMbti1: (value: string | "I" | "E" | null) => void;
    mbti2: string | "N" | "S" | null;
    setMbti2: (value: string | "N" | "S" | null) => void;
    mbti3: string | "T" | "F" | null;
    setMbti3: (value: string | "T" | "F" | null) => void;
    mbti4: string | "J" | "P" | null;
    setMbti4: (value: string | "J" | "P" | null) => void;
    sex: boolean | null;
    setSex: (value: boolean | null) => void;
    profilePageStep: number;
    setProfilePageStep: (value: number) => void;
    name: string;
    setName: (value: string) => void;

};

export const useRegisterStore = create<Store>((set) => ({
    page: 1,
    setPage: (newPage: number) => set({page: newPage}),

    mbti1: null,
    setMbti1: (value) => set({mbti1: value}),

    mbti2: null,
    setMbti2: (value) => set({mbti2: value}),

    mbti3: null,
    setMbti3: (value) => set({mbti3: value}),

    mbti4: null,
    setMbti4: (value) => set({mbti4: value}),

    sex: null,
    setSex: (value) => set({sex: value}),

    profilePageStep: 0,
    setProfilePageStep: (value: number) => set({profilePageStep: value}),

    name: "",
    setName: (value: string) => set({name: value}),
}));
