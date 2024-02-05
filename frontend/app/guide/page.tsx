"use client";

import Link from "next/link";
import React, { useState } from "react";

import styles from "./page.module.css";

export default function Page() {
    const numPages = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage < numPages ? prevPage + 1 : 1));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : numPages));
    };

    return (
        <main className={styles.main}>
            <h1>Guida Introduttiva</h1>
            {/* questi soprastanti sono i punti su cui costruire le slide.
                Gli abbiamo messi nel D2 */}
            <article>
                <div className={styles.slider}>
                    <section
                        className={
                            currentPage === 1
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        <h2>Lista Votazioni</h2>
                        <p>
                            Nella <Link href="/">Home</Link> page puoi vedere le
                            votazioni attualmente in corso e, se ne rispetti i
                            requisiti, puoi prenderne parte.
                        </p>
                    </section>
                    <section
                        className={
                            currentPage === 2
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        <h2>Andamento votazioni</h2>
                        <p>
                            Per ogni votazione è possibile osservarne
                            l&apos andamento in tempo reale
                        </p>
                    </section>
                    <section
                        className={
                            currentPage === 3
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        <h2>Particepa a votazione</h2>
                        <p>
                            Per poter prendere parte a una votazione è
                            necessario effettuare il{" "}
                            <Link href="login">login</Link> tramie uno tra i
                            servizi di identità digitale{" "}
                            <a
                                href="https://www.spid.gov.it/en/"
                                target="_blank"
                            >
                                SPID
                            </a>{" "}
                            o{" "}
                            <a
                                href="https://www.cartaidentita.interno.gov.it/en/home/"
                                target="_blank"
                            >
                                CIE
                            </a>
                        </p>
                    </section>
                    <section
                        className={
                            currentPage === 4
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        <h2>Storico votazioni</h2>
                        <p>
                            Nell&apos <Link href="#">Area Personale</Link> puoi
                            visualizzare lo storico delle votazione a cui hai
                            partecipato
                        </p>
                    </section>
                    <section
                        className={
                            currentPage === numPages
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        <h2>Richiedi amm. delle votazioni</h2>
                        <p>
                            Con questo permesso puoi creare votazioni al livello
                            e nel territorio di tua competenza, una volta
                            verificata la tua identità da parte di un amm. di
                            sistema. Per fare richiesta, visita la pagina{" "}
                            <Link href="#">
                                Richiedi di amministrare le votazioni
                            </Link>
                        </p>
                    </section>
                </div>
                <div className={styles.btnsContainer}>
                    <button onClick={prevPage}>Prev</button>
                    <p>
                        {currentPage} / {numPages}
                    </p>
                    <button onClick={nextPage}>Next</button>
                </div>
            </article>
            <footer>
                To know more about the usage of letsvote, visit the{" "}
                <Link href="/guide/api-docs">api-docs</Link> page
            </footer>
        </main>
    );
}
