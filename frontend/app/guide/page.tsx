import Link from "next/link";

import styles from "./page.module.css";

export default function Page() {
    return (
        <main className={styles.main}>
            <h1>Guida Introduttiva</h1>
            <article>
                <h2>TODO: slides to include</h2>
                <ul>
                    <li>lista votazioni</li>
                    <li>andamento votazioni</li>
                    <li>partecipazione a votazione</li>
                    <li>storico votazioni</li>
                    <li>richiesta amm. delle votazioni</li>
                </ul>
                <p>
                    questi soprastanti sono i punti su cui costruire le slide.
                    Gli abbiamo messi nel D2
                </p>
            </article>
            <footer>
                To know more about the usage of letsvote, visit the{" "}
                <Link href="/guide/api-docs">api-docs</Link> page
            </footer>
        </main>
    );
}
