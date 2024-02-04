"use client";
import { useState } from 'react';
import { Stack, Button, Text, TextInput } from '@mantine/core';
import { TagsInput } from '@mantine/core';

import { FileWithPath } from '@mantine/dropzone';
import { DateValue } from '@mantine/dates';
import { DateTimePicker } from '@mantine/dates';

import RadioCustomGroup from '@/app/components/RadioCustomGroup';
import ImageDropZone from '@/app/components/ImageDropZone';
import ContentTitle from '@/app/components/ContentTitle';

import TextEditor from '@/app/components/TextEditor';

import { Choice, EventType, EventInterface } from '@/app/types';

import { useAddEvent } from '@/app/hooks/useAddEvent';

export type Props = {}

const keys = Object.keys(EventType).filter((item) => {
    return isNaN(Number(item));
});

const publishType = [
    "Non permettere la visualizzazione in tempo reale dei risultati",
    "I risultati sono accessibili in tempo reale in una pagina differente da quella della votazione",
    "I risultati sono accessibili in tempo reale nella pagina della votazione"
]

export const page = (props: Props) => {
    const [createState, setCreateState] = useState<number>(0);

    const [title, setTitle] = useState<string>("");
    const [eventType, setEventType] = useState<number>(EventType.ElezioneComunale);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [startDate, setStartDate] = useState<DateValue>();
    const [endDate, setEndDate] = useState<DateValue>();
    const [publish, setPublish] = useState<string>();
    const [options, setOptions] = useState<string[]>([]);

    const { addEvent } = useAddEvent();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const choices: Choice[] = options.map((val) => {
            return { title: val, body: "" }
        })

        if (startDate && endDate) {
            const eventObj: EventInterface = {
                title: title,
                type: eventType,
                body: "",
                startDate: startDate,
                endDate: endDate,
                choices: choices
            }

            addEvent(eventObj);
        }
    }

    return (
        <>
            <Stack gap="xl">
                <ContentTitle
                    title={"Creazione votazione (" + Number(createState + 1) + "/2)"}
                    subtitle="Compila il form per creare una votazione nel 'comune di Catania.'"
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

                        <ImageDropZone files={files} setFiles={setFiles} />

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

                        <Button
                            variant='filled'
                            mb={30}
                            disabled={
                                !(eventType && files.length > 0 && startDate && endDate && publish)
                            }
                            onClick={() => setCreateState(1)}
                        >Continua</Button>
                    </>)
                    :
                    (<>
                        <Stack gap="xs">
                            <Text fw={500}>Descrizione</Text>
                            <TextEditor />
                        </Stack>

                        <TagsInput
                            size='md'
                            label="Opzioni"
                            description="* Le opzioni scelte corrispondono alle alternative che appariranno al votante."
                            data={[]}
                            value={options}
                            onChange={setOptions}
                            placeholder="Inserisci le opzioni"
                        />

                        <Button
                            variant='filled'
                            mb={30}
                            onClick={e => handleSubmit(e)}
                        >Crea votazione</Button>
                    </>)
                }
            </Stack>
        </>
    );
};

export default page