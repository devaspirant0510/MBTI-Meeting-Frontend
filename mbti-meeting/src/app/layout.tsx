import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import RQProvider from "@/app/_lib/provider/RQProvider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "MBTI Meeting",
    description: "Generated by create next app",
    icons:{
        icon:'/images/favicon.ico'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <RQProvider>

            <NextUIProvider>
                <div className={"main-container"}>
                    <div className={"empty-container"}></div>
                    <div className={"content"}>
                        {children}
                    </div>
                    <div className={"empty-container"}></div>
                </div>
            </NextUIProvider>

        </RQProvider>
        </body>
        </html>
    );
}
