import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <img className={styles.logo} src="./logo.svg" alt="Logo" />
            </Link>
            <nav className={styles.nav}>
                <Link href="/auth">login</Link>
                <a href="/guide">guida introduttiva</a>
                <a href="/votes">votazioni</a>
            </nav>
        </header>
    );
}
