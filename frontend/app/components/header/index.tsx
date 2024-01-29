import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            {/* <Link href="/">
                <img className={styles.logo} src="./logo.svg" alt="Logo" />
            </Link> */}
            <div className={styles.logo}>LETSVOTE</div>
            <nav className={styles.nav}>
                <Link href="/login">Accedi</Link>
                <a href="/guide">Guida introduttiva</a>
                <a href="/pools">Votazioni</a>
            </nav>
        </header>
    );
}
