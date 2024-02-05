"use client";
import { useState, FC } from 'react';

// import { FileWithPath } from '@mantine/dropzone';
import { Stack, Button, Text, TextInput, Group, Tooltip } from '@mantine/core';
import { DateValue } from '@mantine/dates';
import { DateTimePicker } from '@mantine/dates';

import { isReferendum } from '@/app/utils/event';

// import ImageDropZone from '@/app/components/ImageDropZone';
import RadioCustomGroup from '@/app/components/RadioCustomGroup';
import ContentTitle from '@/app/components/ContentTitle';
import ReferendumInput from '@/app/components/ReferendumInput';
import ElectionInput from '@/app/components/ElectionInput';

import { Choice, EventType, EventInterface, OptionDesc } from '@/app/types';

import { useAddEvent } from '@/app/hooks/useAddEvent';
import TextEditor from '@/app/components/TextEditor';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/app/hooks/useEvents';

export type Props = {}

const keys = Object.keys(EventType).filter((item) => {
    return isNaN(Number(item));
});

const publishType = [
    "Non permettere la visualizzazione in tempo reale dei risultati",
    "I risultati sono accessibili in tempo reale in una pagina differente da quella della votazione",
    "I risultati sono accessibili in tempo reale nella pagina della votazione"
]

const CreatePage: FC = (props: Props) => {
    const { events } = useEvents()

    const router = useRouter()
    const { addEvent, error, isLoading } = useAddEvent();

    const [createState, setCreateState] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [eventType, setEventType] = useState<number>(EventType.ElezioneComunale);
    // const [files, setFiles] = useState<FileWithPath[]>([]);
    const [startDate, setStartDate] = useState<DateValue>();
    const [endDate, setEndDate] = useState<DateValue>();
    const [publish, setPublish] = useState<string>();
    const [body, setBody] = useState<string | undefined>("");
    const [options, setOptions] = useState<string[]>([]);
    const [optionsDesc, setOptionsDesc] = useState<OptionDesc>({});

    const canContinue = (): boolean => {
        if (!startDate || !endDate || !title || !eventType || !publish) return false;
        return true;
    }

    const canConfirm = (): boolean => {
        if (!options || options.length == 0) return false;
        if (!isReferendum(eventType)) {
            if (!optionsDesc || Object.values(optionsDesc).length != options.length) return false;

            const hasEmptyElement = Object.values(optionsDesc).some(element => element.length == 0);

            if (hasEmptyElement) {
                return false;
            }
        }

        return true;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const choices: Choice[] = options.map((val) => {
            if (isReferendum(eventType)) {
                return { title: val, body: "" }
            } else {
                return { title: val, body: optionsDesc[val].join(";") }
            }
        })

        if (startDate && endDate) {
            const eventObj: EventInterface = {
                title: title,
                type: eventType,
                body: body || "",
                startDate: startDate,
                endDate: endDate,
                choices: choices
            }

            addEvent(eventObj);

            if (!error) {
                router.push("/events");
            }
        }
    }

    const getSecondPartInput = () => {
        if (isReferendum(eventType))
            return <ReferendumInput state={options} setState={setOptions} />
        else return <ElectionInput state={options} setState={setOptions} subState={optionsDesc} setSubState={setOptionsDesc} />
    }

    return (
        <>
            <Stack gap="xl">
                <ContentTitle
                    title={"Creazione votazione (" + Number(createState + 1) + "/2)"}
                    subtitle="Compila il form per creare una votazione"
                    align={false}
                />

                {createState == 0 ?
                    (<>
                        <TextInput
                            label="Titolo votazione"
                            value={title}
                            onChange={(val) => { setTitle(val.currentTarget.value) }}
                            required
                            withAsterisk
                            placeholder='Referendum costituzionale n. 0123'
                            size='md'
                        />

                        <RadioCustomGroup
                            state={eventType}
                            setState={setEventType}
                            values={keys}
                            name="electionType"
                            label="Seleziona il tipo di votazione"
                        />

                        {/* <ImageDropZone files={files} setFiles={setFiles} /> */}

                        <Stack gap="md" w="100%">
                            <DateTimePicker
                                label="Seleziona la data di inizio"
                                description="Cliccare sul campo per la visualizzazione del selettore"
                                placeholder="Data di inizio"
                                value={startDate}
                                onChange={setStartDate}
                                size="md"
                            />
                            <DateTimePicker
                                label="Seleziona la data di fine"
                                description="Cliccare sul campo per la visualizzazione del selettore"
                                placeholder="Data di fine"
                                value={endDate}
                                onChange={setEndDate}
                                size="md"
                            />
                        </Stack>

                        <RadioCustomGroup
                            state={publish}
                            setState={setPublish}
                            values={publishType}
                            name="publishType"
                            label="Visualizzazione dati in tempo reale"
                        />

                        <Group justify="flex-end" mt="md">
                            <Tooltip label="Riempire tutti i campi!" color="red" disabled={canContinue()}>
                                <Button
                                    variant='filled'
                                    mb={30}
                                    disabled={!canContinue()}
                                    onClick={() => { setCreateState(1); }}
                                >Continua</Button>
                            </Tooltip>
                        </Group>

                    </>)
                    :
                    (<>
                        <Stack gap="xs" >
                            <Text fw={500}> Descrizione </Text>
                            <TextEditor body={body} setBody={setBody} />
                        </Stack>

                        {getSecondPartInput()}

                        <Group justify="flex-end" mt="md">
                            <Tooltip label="Riempire tutti i campi!" color="red" disabled={canConfirm()}>
                                <Button
                                    variant='filled'
                                    mb={30}
                                    disabled={!canConfirm() || isLoading}
                                    onClick={e => handleSubmit(e)}
                                >Crea votazione</Button>
                            </Tooltip>
                        </Group>
                    </>)
                }
            </Stack>
        </>
    );
};

export default CreatePage