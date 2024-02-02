"use client"

import React from 'react'
import Header from '../header'
import Footer from '../footer'

import { useProfile } from '@/app/hooks/useProfile'
import { Text } from '@mantine/core'


const Shell = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    // const { user, error, isLoading } = useProfile();
    // if (isLoading) return <Text>loading...</Text>

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Shell