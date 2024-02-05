"use client"

import { EventFromDb, EventType } from '@/app/types'
import { Table, Button, Text } from '@mantine/core'

import { MdHowToVote, MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";

import React from 'react'
import { getDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import { fromCamelCase } from '@/app/utils/stringManipulation';
import { useProfile } from '@/app/hooks/useProfile';

type Props = {
    events: EventFromDb[],
    renderNumber: number,
    isVotable: boolean,
    user: any
}

const EventsTable = ({ events, renderNumber, isVotable, user }: Props) => {
    const router = useRouter();

    // const { user, error, isLoading } = useProfile();

    // if (isLoading) return <Text>Loading</Text>


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
                            <Button color='red' leftSection={<MdDelete />} disabled={user.id != evnt.authorId}>Rimuovi</Button>
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
        <Table striped>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

export default EventsTable