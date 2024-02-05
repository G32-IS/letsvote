"use client"

import ContentTitle from '@/app/components/ContentTitle'
import { Button } from '@mantine/core'
import React from 'react'

import { useRouter } from 'next/navigation'

type Props = {}

const Error = (props: Props) => {
    const router = useRouter();

    return (
        <>
            <ContentTitle title='Errore' subtitle="Ooops... c'è stato un errore" align={true} />
            <Button onClick={() => router.push("/events")}>Torna alla lista delle votazioni</Button>
        </>
    )
}

export default Error