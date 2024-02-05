"use client"

import { useEffect, useState } from 'react'

import style from "./eventsDisplay.module.css"

import { Stack, Group, NumberInput, Popover, Checkbox, ScrollArea, Button, Text } from "@mantine/core"

import ContentTitle from '../ContentTitle'
import EventsTable from '../EventsTable'
import { RiFilter3Line } from 'react-icons/ri'
import { EventFromDb } from '@/app/types'

type Props = {
    title: string,
    subtitle: string,
    user: any,
    error: any,
    isVotable: boolean,
    events: EventFromDb[],
    renderNumber: number,
    setRenderNumber: (val: number) => void,
}

const EventsDisplay = ({ title, subtitle, user, error, isVotable, events, renderNumber, setRenderNumber }: Props) => {
    const [adminFilter, setAdminFilter] = useState<string[]>([]);
    const [filter, setFilter] = useState<string[]>([]);

    const [eventsToDisplay, setEventsToDisplay] = useState<EventFromDb[]>(events);

    useEffect(() => {
        setEventsToDisplay(events);

        adminFilter.forEach(element => {
            switch (element) {
                case "byMe":
                    setEventsToDisplay(oldEvents => oldEvents.filter((event) => event.authorId === user.id));
                    break;
                default:
                    break;
            }
        });

        filter.forEach(element => {
            switch (element) {
                case "can":
                    // setEventsToDisplay(oldEvents => oldEvents.filter((event) => event.votes.every((vote) => vote.userId !== user.id)));
                    break;
                case "didntVote":
                    // setEventsToDisplay(oldEvents => oldEvents.filter((event) => event.votes.every((vote) => vote.userId !== user.id)));
                    break;
                default:
                    break;
            }
        });
    }, [adminFilter, events, filter, user.id])

    return (
        <>
            <Stack align="flex-end">
                <Group justify="space-between" align="flex-start" w="100%">
                    <ContentTitle title={title} subtitle={subtitle} align={false}/>
                    <Group align="flex-end">
                        <NumberInput
                            label="Mostra"
                            description="il numero di votazioni che verranno mostrate"
                            placeholder="5"
                            value={renderNumber}
                            onChange={(val) => {
                                setRenderNumber(Number(val))
                            }}
                        />
                        <Popover position="bottom" shadow="md">
                            <Popover.Target>
                                <Button>
                                    <Group gap="xs">
                                        <RiFilter3Line size={16} />
                                        <Text>Mostra filtri</Text>
                                    </Group>
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack gap="sm">
                                    {!error && user.role === "Admin" ? <Checkbox.Group
                                        label="Admin"
                                        description="Mostra solo votazioni"
                                        defaultValue={['byMe']}
                                        value={adminFilter}
                                        onChange={setAdminFilter}
                                    >
                                        <Stack gap="xs" w="100%" mt="xs">
                                            <Checkbox value="byMe" label="create da me" classNames={{
                                                body: style.checkBox,
                                            }} />
                                        </Stack>
                                    </Checkbox.Group> : <></>}
                                    <Checkbox.Group
                                        label="Filtri"
                                        description="Mostra solo votazioni"
                                        defaultValue={[]}
                                        value={filter}
                                        onChange={setFilter}
                                    >
                                        <Stack gap="xs" w="100%" mt="xs">
                                            {isVotable ? <Checkbox disabled value="can" label="a cui posso partecipare" classNames={{
                                                body: style.checkBox,
                                            }} /> : <></>}
                                            <Checkbox disabled value="didntVote" label="a cui non ho votato" classNames={{
                                                body: style.checkBox,
                                            }} />
                                        </Stack>
                                    </Checkbox.Group>
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </Group>
            </Stack>
            <ScrollArea.Autosize mah={300} w="100%" mx="auto">
                <EventsTable user={user} events={eventsToDisplay} renderNumber={renderNumber} isVotable={isVotable} />
            </ScrollArea.Autosize>
        </>
    )
}

export default EventsDisplay