import Link from "next/link";

import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav>
                <ul>
                    <li>copyright</li>
                    <li>
                        <Link href="/guide/api-docs">api-docs</Link>
                    </li>
                    <li>help</li>
                </ul>
            </nav>
        </footer>
    );
}
