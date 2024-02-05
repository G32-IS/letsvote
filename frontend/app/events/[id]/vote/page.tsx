"use client"

import style from "./style.module.css"

import { useSingleEvent } from "@/app/hooks/useSingleEvent"
import { Text, Stack, Chip, Group, SegmentedControl, Button } from "@mantine/core"

import { fromCamelCase } from "@/app/utils/stringManipulation"

import { MdHowToVote } from "react-icons/md";

import parse from "html-react-parser"

import Loading from "@/app/components/loading"
import ContentTitle from "@/app/components/ContentTitle"
import { isReferendum } from "@/app/utils/event"

type Props = {
    params: { id: string }
}

const page = ({ params }: Props) => {
    const { singleEvent, error, isLoading } = useSingleEvent(params.id);

    if (isLoading) return <Loading />
    if (error) return <Text>error</Text>

    console.log(singleEvent)

    return (
        <Stack w="100%">
            <ContentTitle title={singleEvent.title} subtitle={fromCamelCase(singleEvent.type)} align={false}/>
            <Stack gap="0" className={style.bodyDesc}>
                {parse(singleEvent.body)}
            </Stack>
            <Stack gap="0px">
                <Text fw={600}>Scegliere una delle seguenti opzioni</Text>
                <Text fw={400}>Cliccare una delle opzioni e poi su conferma per votare.</Text>
            </Stack>
            {
                isReferendum(singleEvent.type) ?
                    <>
                        <SegmentedControl
                            color="blue"
                            orientation="vertical"
                            fullWidth
                            data={singleEvent.choices.map((val: { id: string, title: string }) => {
                                return { value: val.id, label: val.title }
                            })} />
                    </>
                    :
                    <>
                        <SegmentedControl
                            color="blue"
                            orientation="vertical"
                            fullWidth
                            data={singleEvent.choices.map((val: { id: string, title: string, body: string }) => {
                                const candidates = val.body.split(";");
                                const groupLeader = candidates[0];
                                candidates.shift()
                                return {
                                    value: val.id,
                                    label: (
                                        <Group justify="space-between" grow align="flex-start" style={{ padding: "10px" }}>
                                            <Stack>
                                                <Stack w="100%" align="baseline" gap="0">
                                                    <Text size="xs">Nome partito</Text>
                                                    <Text fw={600}>{val.title}</Text>
                                                </Stack>
                                                <Stack w="100%" align="baseline" gap="0">
                                                    <Text size="xs">Capo lista</Text>
                                                    <Text fw={600}>{groupLeader}</Text>
                                                </Stack>
                                            </Stack>

                                            <Stack justify="flex-start" align="flex-start">
                                                <Text size="xs">Lista candidati</Text>
                                                <Stack gap="0px" align="flex-start">
                                                    {
                                                        candidates.map((val) => {
                                                            return <Text>{val}</Text>
                                                        })
                                                    }
                                                </Stack>
                                            </Stack>
                                        </Group>
                                    )
                                }
                            })} />
                    </>
            }
            <Group justify="flex-end" mt="md">
                <Button
                    variant='filled'
                    mb={30}
                    leftSection={<MdHowToVote />}
                // disabled={!canConfirm() || isLoading}
                // onClick={e => handleSubmit(e)}
                >Conferma</Button>
            </Group>
        </Stack>
    )
}

export default page