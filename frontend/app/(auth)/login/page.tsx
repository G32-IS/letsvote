"use client";

import { TextInput, PasswordInput, Button, Group, Box, Stack, Text } from '@mantine/core';
import { useLogin, Login } from "@/app/hooks/useLogin";
import { useState } from "react";
import { useForm } from "@mantine/form"
import ContentTitle from '@/app/components/ContentTitle';

export default function Page() {
    const { login } = useLogin();

    const handleLogin = ({email, password}:Login) => {
        console.log(email,password);
        login({email,password});
    }

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Stack gap="xl">
            <ContentTitle title="Accedi al tuo profilo" subtitle='Per usufruire dei servizi accedi con le tue credenziali'/>
            <form onSubmit={form.onSubmit(values => handleLogin(values))}>
                <Stack gap="xs">
                    <TextInput
                        size='md'
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                        />

                    <PasswordInput
                        type='password'
                        size='md'
                        placeholder='your_pswd'
                        withAsterisk
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                </Stack>


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Accedi</Button>
                </Group>
            </form>
        </Stack>
    );
}


