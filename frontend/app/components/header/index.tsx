"use client";

import Link from "next/link";
import { Text } from "@mantine/core";
import styles from "./header.module.css";
import { useProfile } from "@/app/hooks/useProfile";
import { MdLogout } from "react-icons/md";
import { useLogout } from "@/app/hooks/useLogout";

import HeaderContentSwitch from "../HeaderContentSwitch";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useEffect } from "react";

export default function Header() {
    const router = useRouter();

    const { user, error, isLoading } = useProfile();
    const { logout, isLoading: isLogoutLoading, isSuccess, error: logoutError } = useLogout();

    const logoutHandle = (e: any) => {
        e.preventDefault();
        logout();

        router.push("/")
    };

    // if (logoutError) return <Text>error...</Text>;
    useEffect(() => {
        if (isSuccess) {
            router.push("/");
        }
    }, [isSuccess, router])
 

    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>

                <Link className={styles.logo} href="/">
                    letsvote
                </Link>
                {isLoading || isLogoutLoading ? <></> :
                    <nav className={styles.nav}>
                        <Link href="/events">Votazioni</Link>

                        {error ? (
                            <>
                                <Link href="/guide">Guida introduttiva</Link>
                                <Link href="/login" className={styles.loginBtn}>Accedi</Link>
                            </>
                        ) : (
                            <>
                                {<HeaderContentSwitch role={user.role} />}
                                <Text c="white">{user.email}</Text>
                                <MdLogout
                                    color="white"
                                    onClick={(e) => logoutHandle(e)}
                                />
                            </>
                        )}
                    </nav>
                }
            </header>
        </div>
    );
}
