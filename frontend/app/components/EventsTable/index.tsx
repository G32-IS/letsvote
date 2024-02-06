"use client"

import { EventFromDb, EventType } from '@/app/types'
import { Table, Button, Text } from '@mantine/core'

import { MdHowToVote, MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";

import React, { useEffect } from 'react'
import { getDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import { fromCamelCase } from '@/app/utils/stringManipulation';
import { useProfile } from '@/app/hooks/useProfile';
import { useRemoveEvent } from '@/app/hooks/useRemoveEvent';

import { notifications } from '@mantine/notifications';
import { CustomError } from '@/app/utils/errors/CustomError';

type Props = {
    events: EventFromDb[],
    renderNumber: number,
    isVotable: boolean,
    user: any
}

const EventsTable = ({ events, renderNumber, isVotable, user }: Props) => {
    const router = useRouter();
    const { deleteEvent, error, isSuccess } = useRemoveEvent()

    useEffect(() => {
        if (isSuccess) {
            notifications.show({
                title: "Evento rimosso",
                message: "Evento rimosso con successo"
            })
        } else if (error) {
            notifications.show({
                color: "red",
                title: "Errore",
                message: error instanceof CustomError ? error.message : "C'è stato un errore",
            })
        }
    }, [error, isSuccess])

    const rows = events.map((evnt: EventFromDb, index: number) => {
        if (index >= renderNumber) return <></>;

        const { year, month, day, hour, minute } = getDate(new Date(evnt.endDate))
        return (
            <Table.Tr key={evnt.id}>
                <Table.Td>{evnt.title}</Table.Td>
                <Table.Td>{fromCamelCase(String(evnt.type))}</Table.Td>
                <Table.Td>{day + " " + month + " " + year + ", " + hour + ":" + minute}</Table.Td>
                <Table.Td>{evnt.type == EventType.ElezioneParlamentare || evnt.type || EventType.ReferendumNazionale ?
                    "Nazionale"
                    :
                    evnt.pob.locality + " " + evnt.pob.region
                }</Table.Td>
                {isVotable ? <Table.Td>
                    <Button leftSection={<MdHowToVote />} onClick={() => {
                        router.push(`/events/${evnt.id}/vote`)
                    }}>Vota</Button>
                </Table.Td> : <></>}
                <Table.Td>
                    <Button variant='default' leftSection={<IoEye />}>Visualizza andamento</Button>
                </Table.Td>
                {
                    user && user.role == "Admin" ?
                        <Table.Td>
                            <Button onClick={() => {
                                deleteEvent(evnt.id);
                            }} color='red' leftSection={<MdDelete />} disabled={user.id != evnt.authorId}>Rimuovi</Button>
                        </Table.Td> : <></>
                }
            </Table.Tr>
        )
    });

    const ths = (
        <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Data fine</Table.Th>
            <Table.Th>Territorio</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
            {user && user.role == "Admin" ? <Table.Th></Table.Th> : <></>}
        </Table.Tr>
    );
    return (
        <Table.ScrollContainer minWidth="100%" mx="auto" w="100%" mah={300}>
            <Table striped>
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default EventsTable