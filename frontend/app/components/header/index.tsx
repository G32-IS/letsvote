"use client"

import Link from "next/link";
import { Text } from "@mantine/core"
import styles from "./header.module.css";
import { useProfile } from "@/app/hooks/useProfile";
import { MdLogout } from "react-icons/md";
import { useLogout } from "@/app/hooks/useLogout";

export default function Header() {
    const { user, error, isLoading } = useProfile();
    const { logout } = useLogout()
    const logoutHandle = (e: any) => {
        e.preventDefault();
        logout();
    }

    return (
        <header className={styles.header}>
            <Link className={styles.logo} href="/">letsvote</Link>
            <nav className={styles.nav}>
                {error || user.role=== "Voter" ? <Link href="/guide">Guida introduttiva</Link> : <></>}
                <Link href="/polls">Votazioni</Link>

                {error || isLoading ?
                    <Link href="/login" className={styles.loginBtn}>Accedi</Link> :
                    <>
                        {user.role === "SysAdmin" ?
                            <>
                                <Link href="#">Le tue votazioni</Link>
                                <Link href="/create">Crea una votazione</Link>
                            </>
                            :
                            <></>}
                        <Text c="white">{user.email}</Text>
                        <MdLogout color="white" onClick={(e) => logoutHandle(e)} />
                    </>
                }
            </nav>
        </header>
    );
}
