"use client";

import { SPIDReactButtonDropdown } from "@dej611/spid-react-button";
import "@dej611/spid-react-button/dist/index.css";

import styles from "./page.module.css";

const defaultURL = "/myLogin/idp={{idp}}";

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.textCont}>
                <h1>Accedi al tuo profilo</h1>
                <p>
                    Accedi al tuo profilo per poter votare e partecipare alle
                    votazioni.
                </p>
            </div>
            <div>
                <SPIDReactButtonDropdown url={defaultURL}></SPIDReactButtonDropdown>
                <div>Accedi con DEMO</div>
            </div>
        </div>
    );
}
