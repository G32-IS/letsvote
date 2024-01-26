"use client";

import { SPIDReactButtonDropdown } from "@dej611/spid-react-button";
import "@dej611/spid-react-button/dist/index.css";

import styles from "./page.module.css";

const defaultURL = "/myLogin/idp={{idp}}";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    return (
        <main className={styles.main}>
            <h1>Login</h1>
            <SPIDReactButtonDropdown url={defaultURL}></SPIDReactButtonDropdown>
        </main>
    );
}
