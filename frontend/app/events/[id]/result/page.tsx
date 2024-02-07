"use client"

import style from "./result.module.css"

import ContentTitle from '@/app/components/ContentTitle'
import Loading from '@/app/components/Loading'
import { useEventResult } from '@/app/hooks/useEventResult'
import { useSingleEvent } from '@/app/hooks/useSingleEvent'
import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { MdDownload } from "react-icons/md";

type Props = {
    params: { id: string }
}

const ResultPage = ({ params }: Props) => {
    const router = useRouter();
    const { result, error: resultError, isLoading: isEventResultLoading } = useEventResult(params.id);
    const { singleEvent, error: singleEventError, isLoading: isSingleEventLoading } = useSingleEvent(params.id)

    useEffect(() => {
        if (resultError || singleEventError) router.push("/error");
    }, [resultError, singleEventError, router])

    if (isEventResultLoading || isSingleEventLoading || resultError || singleEventError) return <Loading />

    const exportData = (data: any) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `data_${singleEvent.title}.json`;

        link.click();
    };

    const isLive = (date: string): boolean => {
        const now = new Date();
        const endDate = new Date(date)
        if (now < endDate) return true;
        return false;
    }

    return (
        <Stack w="100%">
            <Group align='flex-start'>
                <Stack gap="0" align={"flex-start"}>
                    <Group align="center" gap="xs">
                        <Title order={1}>{isLive(singleEvent.endDate) ? 'Andamento live' : 'Risultato votazione'}</Title>
                        {isLive(singleEvent.endDate) ? <div className={style.circle}></div> : <></>}
                    </Group>
                    <Text>{singleEvent.title}</Text>
                </Stack>
            </Group>
            <Text>Numero di voti: {result.length}</Text>
            <Group justify="flex-end" mt="md">
                <Button leftSection={<MdDownload />} onClick={() => {
                    exportData(result)
                }}>Scarica dati</Button>
            </Group>

        </Stack>
    )
}

export default ResultPage