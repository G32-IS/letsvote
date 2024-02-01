"use client";

import Link from "next/link";
import React, { useState } from "react";

import styles from "./page.module.css";

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage < 5 ? prevPage + 1 : 1));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 5));
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
                        lista votazioni
                    </section>
                    <section
                        className={
                            currentPage === 2
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        andamento votazioni
                    </section>
                    <section
                        className={
                            currentPage === 3
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        partecipazione a votazione
                    </section>
                    <section
                        className={
                            currentPage === 4
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        storico votazioni
                    </section>
                    <section
                        className={
                            currentPage === 5
                                ? styles.displayBlock
                                : styles.displayNone
                        }
                    >
                        richiesta amm. delle votazioni
                    </section>
                </div>
                <div className={styles.btnsContainer}>
                    <button onClick={prevPage}>Prev</button>
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
