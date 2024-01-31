import Link from "next/link";

import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.textCont}>
                <p className={styles.logo}>letsvote</p>
                <div className={styles.textList}>
                    <p className={styles.contactTitle}>Contatti</p>
                    <Link className={styles.link} href="#">
                        +39 1234567890
                    </Link>
                    <Link className={styles.link} href="#">
                        info@letsvote.it
                    </Link>
                </div>
            </div>
            <div className={`${styles.textCont} ${styles.rightTextCont}`}>
                <Link className={styles.link} href="#">
                    Richiedi di amministrare le votazioni
                </Link>
                <article>
                    <h4>For developers</h4>
                    <ul>
                        <li>
                            <Link
                                className={styles.link}
                                href="/guide/api-docs"
                            >
                                api-docs
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={styles.link}
                                href="/guide/api-tests"
                            >
                                api-tests
                            </Link>
                        </li>
                    </ul>
                </article>
                <p>© 2023 letsvote. All rights reserved.</p>
            </div>
        </footer>
    );
}
