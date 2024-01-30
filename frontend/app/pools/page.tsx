"use client";

import { useTest } from "../hooks/useTest";

export default function Page() {
    const { test, isLoading, error } = useTest();

    if (isLoading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);
    
    return (
        <>
            <div>test: {test}</div>
        </>
    );
}
