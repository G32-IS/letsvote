"use client";

import Loading from "./components/loading";
import { useProfile } from "./hooks/useProfile";

export default function Home() {
    const { user, isLoading, error } = useProfile();

    if (isLoading) return <Loading />;
    if (error)
        return (
            <>
                <h1>Error</h1>
                {error.message}
            </>
        );
    

    return (
        <>
            <h1>test</h1>
            {user.email}
        </>
    );
}
