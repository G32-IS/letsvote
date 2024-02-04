import { EventFromDb } from '@/app/types'
import { Table } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

type Props = {
    events: EventFromDb[],
    renderNumber: number,
    isVotable: boolean
}

const EventsTable = ({ events, renderNumber, isVotable }: Props) => {
    const rows = events.map((evnt: EventFromDb, index: number) => {
        if (index >= renderNumber) return <></>;

        const evntDate = new Date(evnt.endDate);

        return (
            <Table.Tr key={index}>
                <Table.Td>{evnt.title}</Table.Td>
                <Table.Td>{evnt.type}</Table.Td>
                <Table.Td>{evntDate.toUTCString()}</Table.Td>
                <Table.Td>{"dove???"}</Table.Td>
                {isVotable ? <Table.Td><Link href="">Vota</Link></Table.Td> : <></>}
                <Table.Td><Link href="">Visualizza andamento</Link></Table.Td>
            </Table.Tr>
        )
    });

    const ths = (
        <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Data fine</Table.Th>
            <Table.Th>Luogo</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
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