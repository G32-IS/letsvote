"use client";

import React, { useEffect, useState } from "react";

import { SPIDReactButtonDropdown } from "@dej611/spid-react-button";
// import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "@dej611/spid-react-button/dist/index.css";

const defaultURL = "/myLogin/idp={{idp}}";

export default function Home() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    // how to use .env variables on the client side in next.js: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
                    `http://localhost:${process.env.NEXT_PUBLIC_BE_PORT}`
                );
                const result = await response.text();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            <h1>letsvote frontend</h1>
            <p>{data}</p>
            <SPIDReactButtonDropdown url={defaultURL}></SPIDReactButtonDropdown>
        </main>
    );
}
