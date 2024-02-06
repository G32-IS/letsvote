"use client"

import { useSendAdminRequest } from "@/app/hooks/useSendAdminRequest"
import { CustomError } from "@/app/utils/errors/CustomError"
import { Anchor, Button, Text, rem } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"

import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

type Props = {}

const RequestToBeAdmin = (props: Props) => {
    const { send, error, isLoading, isSuccess } = useSendAdminRequest()
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            if (error) {
                const messaggio = error instanceof CustomError ? error.message : 'Si è verificato un errore'
                notifications.update({
                    id,
                    color: 'red',
                    title: 'Errore nell\'invio della richiesta',
                    message: messaggio + ', la notifica si chiuderà automaticamente in 5 secondi...',
                    icon: <MdError style={{ width: rem(18), height: rem(18) }} />,
                    loading: false,
                    autoClose: 5000,
                });
            }
            else if (isSuccess) {
                notifications.update({
                    id,
                    color: 'teal',
                    title: 'Richiesta inviata con successo',
                    message: 'La notifica si chiuderà automaticamente in 5 secondi...',
                    icon: <FaCheckCircle style={{ width: rem(18), height: rem(18) }} />,
                    loading: false,
                    autoClose: 5000,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isSuccess])

    const handleClick = () => {
        if (id == null) {
            const id = notifications.show({
                loading: true,
                title: 'Inoltrando la richiesta...',
                message: 'Attendere finchè la richiesta non viene inviata',
                autoClose: false,
                withCloseButton: true,
                onClose: () => setId(null)
            });

            send();
            setId(id);
        }
    }


    return (
        <Anchor underline="never" onClick={handleClick}>Richiedi di diventare amministratore</Anchor>
    )
}

export default RequestToBeAdmin