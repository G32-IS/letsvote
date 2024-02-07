"use client"

import ContentTitle from '@/app/components/ContentTitle'
import Loading from '@/app/components/Loading'
import { useEventResult } from '@/app/hooks/useEventResult'
import { useSingleEvent } from '@/app/hooks/useSingleEvent'
import { Button, Stack, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

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

    if (isEventResultLoading || isSingleEventLoading) return <Loading />

    const exportData = (data: any) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `data_${singleEvent.title}.json`;

        link.click();
    };

    return (
        <Stack w="100%">
            <ContentTitle title='Risultato votazione' subtitle={singleEvent.title} align={false} />
            <Text>Numero di voti: {result.length}</Text>
            <Button onClick={() => {
                exportData(result)
            }}>Scarica dati</Button>
        </Stack>
    )
}

export default ResultPage