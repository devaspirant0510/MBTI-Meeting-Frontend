"use client"
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import styles from "./Fireworks.module.css";
import {Button} from "@nextui-org/react";
import Link from "next/link";

const FireworksAnimation = () => {
    const fireworksVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: [1, 1.5, 0],
            opacity: [1, 0.8, 0],
            transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
        },
    };

    return (
        <div className={styles.container}>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    className={styles.circle}
                    key={i}
                    variants={fireworksVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        position: "absolute",
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    }}
                />
            ))}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                className={styles.text}
            >
                🎉 Congratulations on Signing Up! 🎉
            </motion.div>
        </div>
    );
};

export default function SuccessPage() {
    const [showFireworks, setShowFireworks] = useState(false);

    useEffect(() => {
        // 일정 시간이 지난 후 폭죽 애니메이션을 보여주기
        setTimeout(() => {
            setShowFireworks(true);
        }, 500); // 가입 축하 후 0.5초 뒤에 애니메이션 실행
    }, []);

    return (
        <div>
            <h1>가입을 축하합니다! 🎉</h1>
            {showFireworks && <FireworksAnimation/>}
            <Link href={"/home"}>
                <Button>홈으로</Button>
            </Link>
        </div>);
}