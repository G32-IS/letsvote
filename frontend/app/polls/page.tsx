"use client";

import { useTest } from "../hooks/useTest";
import Loading from "../components/loading";

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
        <>
            <p>test: {test}</p>
        </>
    );
}
