"use client";

import { useEvents } from "../hooks/useEvents";
import Loading from "../components/loading";

import { Autocomplete, NumberInput, Table } from '@mantine/core';
import { EventFromDb } from "../types";

import { Group, Stack, TextInput } from "@mantine/core";
import ContentTitle from "../components/ContentTitle";
import Link from "next/link";
import { useState } from "react";
import EventsTable from "../components/EventsTable";

export default function Page() {
    const { events, isLoading, error } = useEvents();
    const [activeNumber, setActiveNumber] = useState<number>(10);
    const [inactiveNumber, setInactiveNumber] = useState<number>(10);

    if (isLoading) return <Loading />;
    if (error)
        return (
            <>
                <h1>Error</h1>
                {/* <p>{error}</p> */}
            </>
        );

    const now = new Date();

    const { activeEvents, inactiveEvents } = events.reduce((acc, evnt: EventFromDb) => {
        const endDate = new Date(evnt.endDate);
        if (endDate > now) {
            acc.activeEvents.push(evnt);
        } else {
            acc.inactiveEvents.push(evnt);
        }
        return acc;
    }, { activeEvents: [], inactiveEvents: [] });


    return (
        <>
            <Stack gap="xl" w="100%">
                <Group justify="space-between" align="flex-start">
                    <ContentTitle title="Votazioni attive" subtitle="Lista delle votazioni attive" />
                    <Group>
                        <NumberInput
                            label="Mostra"
                            description="Il numero di votazioni che verranno mostrate"
                            placeholder="5"
                            value={activeNumber}
                            onChange={(val) => {
                                setActiveNumber(Number(val))
                            }}
                        />
                    </Group>
                </Group>

                <EventsTable events={activeEvents} renderNumber={activeNumber} isVotable={true} />
            </Stack>

            <Stack gap="xl" w="100%">
                <Group justify="space-between" align="flex-start">
                    <ContentTitle title="Votazioni concluse" subtitle="Lista delle votazioni concluse" />
                    <Group>
                        <NumberInput
                            label="Mostra"
                            description="Il numero di votazioni che verranno mostrate"
                            placeholder="5"
                            value={inactiveNumber}
                            onChange={(val) => {
                                setInactiveNumber(Number(val))
                            }}
                        />
                    </Group>
                </Group>

                <EventsTable events={inactiveEvents} renderNumber={inactiveNumber} isVotable={false} />
            </Stack>
        </>
    );
}
