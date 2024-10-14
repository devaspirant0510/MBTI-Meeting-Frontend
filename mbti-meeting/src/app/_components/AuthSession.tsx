'use client';
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = ({
    children: any;
});

export default function AuthSession({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}