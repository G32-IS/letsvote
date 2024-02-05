"use client";

import { TextInput, PasswordInput, Button, Group, Box, Stack, Text } from '@mantine/core';
import { useLogin } from "@/app/hooks/useLogin";
import { Credentials } from '@/app/types';
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"
import ContentTitle from '@/app/components/ContentTitle';
import Error from '@/app/components/Error';
import { useEffect } from 'react';
import { CustomError } from '@/app/utils/errors/CustomError';

export default function Page() {
    const router = useRouter();

    const { login, error, isLoading, isSuccess } = useLogin();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => null
        },
    });

    useEffect(() => {
        if (isSuccess) {
            form.reset();
            router.push("/");
        }
    }, [form, isSuccess, router]);
    
    if (error && !(error instanceof CustomError)) return <Error message="Si è verificato un errore"/>

    const handleLogin = ({ email, password }: Credentials) => {
        login({ email, password });
    }

    return (
        <Stack gap="xl">
            <ContentTitle title="Accedi al tuo profilo" subtitle='Per usufruire dei servizi accedi con le tue credenziali' align={false} />
            <form onSubmit={form.onSubmit(values => handleLogin(values))}>
                <Stack gap="xs">
                    <TextInput
                        size='md'
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        disabled={isLoading}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        size='md'
                        placeholder='your_pswd'
                        withAsterisk
                        label="Password"
                        disabled={isLoading}
                        {...form.getInputProps('password')}
                        error={error && error instanceof CustomError ? error.message : false}
                    />
                </Stack>


                <Group justify="flex-end" mt="md">
                    <Button type="submit" disabled={isLoading}>Accedi</Button>
                </Group>
            </form>
        </Stack>
    );
}


