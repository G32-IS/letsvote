"use client";

import Loading from "./components/loading";
import { useProfile } from "./hooks/useProfile";

export default function Home() {
    const { user, isLoading, error } = useProfile();
    console.log(isLoading, error)
    if (isLoading) return <Loading />;
    if (error)
        return (
            <>
                <h1>Error</h1>
                {error.message}
            </>
        );
    
    console.log(user)
    return (
        <>
            <h1>test</h1>
            {user.email}
        </>
    );
}
