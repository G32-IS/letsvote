"use client";
import { CustomError } from "./utils/errors/CustomError";

import Loading from "./components/Loading";
import ContentTitle from "./components/ContentTitle";

import { useProfile } from "./hooks/useProfile";
import { Stack } from "@mantine/core";

export default function Home() {
    const { user, isLoading, error } = useProfile();

    if (isLoading) return <Loading />;
    if (error && !(error instanceof CustomError))
        return <ContentTitle title="Errore" subtitle="Si è verificato un errore" align={true} />;


    return (
        <Stack w="100%">
            <ContentTitle title="letsvote" subtitle={`Benvenuto${" " + user.mail || ""}.`} align={false}/>
            
        </Stack>
    );
}
