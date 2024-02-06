"use client";

import Link from "next/link";
import React, { useState } from "react";

import { Button, Group, Stack, Text, Title } from "@mantine/core"

import RequestToBeAdmin from "../components/RequestToBeAdmin";

const guideContent = [
    {
        title: `Lista votazioni`,
        content: `Nella pagina delle votazioni puoi vedere le votazioni attualmente in corso e, se ne rispetti i requisiti, puoi prenderne parte.`,
        visit: <Link href="/events">Votazioni</Link>
    },
    {
        title: `Andamento votazioni`,
        content: `Per ogni votazione è possibile osservarne l'andamento in tempo reale.`
    },
    {
        title: `Accesso`,
        content: `Per poter prendere parte a una votazione è necessario effettuare il login tramite uno tra i servizi di identità digitale`,
        visit: <Link href="/login">Accedi</Link>
    },
    {
        title: `Amministrare le votazioni`,
        content: `Con questo permesso puoi creare votazioni al livello
        e nel territorio di tua competenza, una volta
        verificata la tua identità da parte di un amm. di
        sistema.`,
        visit: <RequestToBeAdmin />
    }


]
export default function Page() {
    const numPages = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage < numPages ? prevPage + 1 : 1));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : numPages));
    };

    return (
        <Stack w="100%" align="center">
            <Title order={1}>Guida Introduttiva</Title>

            <Stack h="100%" justify="center">
                <Stack gap="xs" w="100%" mb="auto" h={150} align="center">
                    <Stack gap="0" w="100%" align="center">
                        <Title order={2}>{guideContent[currentPage-1].title}</Title>
                        {guideContent[currentPage-1].visit}
                    </Stack>
                    <Text w="70%" ta="center">{guideContent[currentPage-1].content}</Text>
                </Stack>

                <Group justify="center">
                    <Button variant="default" onClick={prevPage}>Precedente</Button>
                    <Text>{currentPage} / {numPages}</Text>
                    <Button onClick={nextPage}>Successivo</Button>
                </Group>
            </Stack>
            <Text ta="center">
                {`Per saperne di più riguardo l'utilizzo di letsvote, visita `}
                <Link href="/guide/api-docs">api-docs</Link>.
            </Text>
        </Stack>
    );
}
