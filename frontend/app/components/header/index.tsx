"use client";

import Link from "next/link";
import { Text } from "@mantine/core";
import styles from "./header.module.css";
import { useProfile } from "@/app/hooks/useProfile";
import { MdLogout } from "react-icons/md";
import { useLogout } from "@/app/hooks/useLogout";

import HeaderContentSwitch from "../HeaderContentSwitch";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const { user, error, isLoading } = useProfile();
    const { logout } = useLogout();

    const logoutHandle = (e: any) => {
        e.preventDefault();
        logout();
        
        router.push("/")
    };

    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>
                <Link className={styles.logo} href="/">
                    letsvote
                </Link>
                {isLoading ? <></> :
                    <nav className={styles.nav}>
                        <Link href="/events">Votazioni</Link>

                        {error ? (
                            <Link href="/login" className={styles.loginBtn}>
                                Accedi
                            </Link>
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
