"use client";

import { useTest } from "../hooks/useTest";
import Loading from "../components/loading";

import styles from "./page.module.css";

export default function Page() {
    const { test, isLoading, error } = useTest();

    if (isLoading) return <Loading />;
    if (error)
        return (
            <>
                <h1>Error</h1>
                {/* <p>{error}</p> */}
            </>
        );

    return (
        <main className={styles.main}>
            <h1>test</h1>
            <ul>
                {/* {Object.keys(test).map((key) => (
                    <li key={key}>
                        <strong>{key}:</strong> {test[key]}
                    </li>
                ))} */}
            </ul>
        </main>
    );
}
