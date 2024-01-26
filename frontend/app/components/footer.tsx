import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav>
                <ul>
                    <li>copyright</li>
                    <li>contanct</li>
                    <li>help</li>
                </ul>
            </nav>
        </footer>
    );
}
