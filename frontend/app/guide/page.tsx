import Link from "next/link";

import styles from "./page.module.css";

export default function Page() {
    return (
        <main className={styles.main}>
            <h1>Guida Introduttiva</h1>
            <article>content</article>
            <footer>
                To know more about the usage of letsvote, visit the{" "}
                <Link href="/guide/api-docs">api-docs</Link> page
            </footer>
        </main>
    );
}
