import styles from "./header.module.css";

export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <header className={styles.header}>
            <a href="#">
                <img className={styles.logo} src="./logo.svg" alt="Logo" />
            </a>
            <nav className={styles.nav}>
                <a href="#">crea votazione</a>
                <a href="#">le tue votazioni</a>
                <a href="#">impostazioni</a>
            </nav>
        </header>
    );
}
