"use client";

import React, { useEffect, useState } from "react";

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
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <main>
            <h1>letsvote frontend</h1>
            <p>{data}</p>
        </main>
    );
}
