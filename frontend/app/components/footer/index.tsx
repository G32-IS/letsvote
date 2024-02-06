import Link from "next/link";

import styles from "./footer.module.css";
import { useProfile } from "@/app/hooks/useProfile";
import RequestToBeAdmin from "../RequestToBeAdmin";

export default function Footer() {
    const {user, isLoading, error} = useProfile();

    return (
        <div className={styles.footerWrapper}>
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
                    {!isLoading && !error && user.role == "Voter" ? <RequestToBeAdmin /> : <></>}
                    <article>
                        <h4>For developers</h4>
                        <ul>
                            <li>
                                <Link
                                    className={styles.link}
                                    href={`${process.env.SERVER_URL}/api-docs`}
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
        </div>
    );
}
