import Link from "next/link";

import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.textCont}>
                <p className={styles.logo}>LETSVOTE</p>
                <div className={styles.textList}>
                    <p className={styles.contactTitle}>Contatti</p>
                    <Link className={styles.link} href="#">+39 1234567890</Link>
                    <Link className={styles.link} href="#">info@letsvote.it</Link>
                </div>
            </div>
            <div className={`${styles.textCont} ${styles.rightTextCont}`}>
                <Link className={styles.link} href="#">Richiedi di amministrare le votazioni</Link>
                <div className={styles.textList}>
                    <Link className={styles.link} href="#">Politica sulla riservatezza</Link>
                    <Link className={styles.link} href="#">Termini di servizio</Link>
                    <Link className={styles.link} href="/guide/api-docs">Documentazione api</Link>
                    <p>© 2023 LetsVote. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
