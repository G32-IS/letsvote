"use client"

import ContentTitle from '@/app/components/ContentTitle'
import Loading from '@/app/components/Loading'
import { useHandleRequest } from '@/app/hooks/useHandleRequest'
import { useRequests } from '@/app/hooks/useRequests'
import { Button, Stack, Table } from '@mantine/core'

import { FaCheckCircle } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";

type Props = {}

const Requests = (props: Props) => {
  const { requests, error, isLoading } = useRequests();
  const { handle } = useHandleRequest();

  const getRows = (elements) => {
    return elements.map((element) => {
      return (
        <Table.Tr key={element.id}>
          <Table.Td fw={600}>{element.state}</Table.Td>
          <Table.Td>{element.user.email}</Table.Td>
          <Table.Td>{element.user.name}</Table.Td>
          <Table.Td><Button disabled={element.state != 'Pending'} color='teal' leftSection={<FaCheckCircle />} onClick={() => {
            const newElement = element;
            newElement.state = 'Accepted';
            handle(newElement)
          }}>Accetta</Button>
          </Table.Td>
          <Table.Td><Button disabled={element.state != 'Pending'} color='red' leftSection={<IoIosRemoveCircle />} onClick={() => {
            const newElement = element;
            newElement.state = 'Declined';
            handle(newElement)
          }}>Rifiuta</Button>
          </Table.Td>
        </Table.Tr>
      )
    });
  }

  return (
    <Stack w="100%">
      <ContentTitle title="Richieste di amministrazione" subtitle={`Cliccando su conferma, si conferiscono i permessi, all’utente identificato dall'email, di gestire votazioni.`} align={false} />
      {isLoading || error ? <Loading /> :
        <Table.ScrollContainer minWidth="100%" type="native">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Stato della richiesta</Table.Th>
                <Table.Th>Email utente</Table.Th>
                <Table.Th>Nome e Cognome</Table.Th>
                <Table.Th></Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{getRows(requests)}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      }
    </Stack>
  )
}

export default Requests