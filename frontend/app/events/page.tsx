"use client";

import { useEvents } from "../hooks/useEvents";
import Loading from "../components/Loading";
import { EventFromDb } from "../types";

import { Stack } from "@mantine/core";

import ContentTitle from "../components/ContentTitle";
import Error from "../components/Error";

import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import EventsDisplay from "../components/EventsDisplay";

export default function Page() {
    const { events, isLoading: isLoadingEvents, error: eventsError } = useEvents();
    const { user, isLoading: isLoadingProfile, error: profileError } = useProfile();

    const [activeEvents, setActiveEvents] = useState<EventFromDb[]>([]);
    const [inactiveEvents, setInactiveEvents] = useState<EventFromDb[]>([]);

    const [activeNumber, setActiveNumber] = useState<number>(10);
    const [inactiveNumber, setInactiveNumber] = useState<number>(10);

    useEffect(() => {
        if (!isLoadingEvents && !isLoadingProfile && !eventsError && events) {
            const now = new Date();
            const { activeEvents, inactiveEvents } = events.reduce(
                (acc: { activeEvents: EventFromDb[]; inactiveEvents: EventFromDb[]; }, evnt: EventFromDb) => {
                    const endDate = new Date(evnt.endDate);
                    if (endDate > now) {
                        acc.activeEvents.push(evnt);
                    } else {
                        acc.inactiveEvents.push(evnt);
                    }
                    return acc;
                },
                { activeEvents: [], inactiveEvents: [] }
            );

            setActiveEvents(activeEvents);
            setInactiveEvents(inactiveEvents);
        }
    }, [events, isLoadingEvents, isLoadingProfile, eventsError]);

    if (isLoadingEvents || isLoadingProfile) return <Loading />;
    if (eventsError) return (<Error message={eventsError.message} />);

    interface Content {
        title: string,
        subtitle: string,
        events: EventFromDb[],
        setStateFn: (val: number) => void,
        renderNumber: number,
        isVotable: boolean
    }
    const contents: Content[] = [
        {
            title: "Votazioni attive",
            subtitle: "Lista delle votazioni attive",
            events: activeEvents,
            setStateFn: setActiveNumber,
            renderNumber: activeNumber,
            isVotable: true
        },
        {
            title: "Votazioni concluse",
            subtitle: "Lista delle votazioni concluse",
            events: inactiveEvents,
            setStateFn: setInactiveNumber,
            renderNumber: inactiveNumber,
            isVotable: false
        }
    ]

    return (
        <Stack gap="xl" w="100%">
            {activeEvents.length == 0 && inactiveEvents.length == 0 ?
                <ContentTitle title="Non sono state trovate votazioni" subtitle="Non sono presenti votazioni, se pensi che sia un errore contattaci." align={true}/>
                :
                contents.map((val: Content, index: number) => {
                    return <Stack gap="xl" w="100%" key={index}>
                        {
                            val.events.length > 0 ?
                                <EventsDisplay
                                    title={val.title}
                                    subtitle={val.subtitle}
                                    events={activeEvents}
                                    setRenderNumber={val.setStateFn}
                                    renderNumber={val.renderNumber}
                                    error={profileError}
                                    isVotable={val.isVotable}
                                    user={user}
                                />
                                :
                                <>
                                    <ContentTitle title={val.title} subtitle={"Non sono state trovate votazioni " + val.title.toLowerCase()} align={false} />
                                </>
                        }
                    </Stack>
                })}
        </Stack>

    );
}
