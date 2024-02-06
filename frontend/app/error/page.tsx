"use client"

import { Button } from '@mantine/core'
import React from 'react'

import { useRouter } from 'next/navigation'

type Props = {}

import ErrorComponent from "../components/Error"

const Error = (props: Props) => {
    const router = useRouter();

    return (
        <>
            <ErrorComponent message="Qualcosa è andato storto." />
            <Button onClick={() => router.push("/")}>Torna alla home</Button>
        </>
    )
}

export default Error