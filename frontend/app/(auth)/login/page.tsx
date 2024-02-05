"use client";

import { TextInput, PasswordInput, Button, Group, Box, Stack, Text } from '@mantine/core';
import { useLogin } from "@/app/hooks/useLogin";
import { Credentials } from '@/app/types';
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"
import ContentTitle from '@/app/components/ContentTitle';

export default function Page() {
    const router = useRouter();

    const { login, error, isLoading } = useLogin();

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

    const handleLogin = ({email, password}:Credentials) => {
        login({email,password});
        if (!error) {
            form.reset();
            router.push("/")
        }
    }

    return (
        <Stack gap="xl">
            <ContentTitle title="Accedi al tuo profilo" subtitle='Per usufruire dei servizi accedi con le tue credenziali' align={false}/>
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
                        error={error ? "Credenziali errate" : false}
                    />
                </Stack>


                <Group justify="flex-end" mt="md">
                    <Button type="submit" disabled={isLoading}>Accedi</Button>
                </Group>
            </form>
        </Stack>
    );
}


