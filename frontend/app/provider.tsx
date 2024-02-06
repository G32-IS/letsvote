"use client";

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';

const theme = createTheme({});

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <DatesProvider settings={{ locale: 'it', firstDayOfWeek: 0, weekendDays: [5, 6], timezone: 'UTC' }}>
                    <Notifications />
                    {children}
                </DatesProvider>
            </MantineProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

