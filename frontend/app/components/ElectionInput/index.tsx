"use client"

import style from "./style.module.css"

import { OptionDesc } from "@/app/types"

import { Stack, Text, TagsInput, Button } from "@mantine/core"
import TextEditor from '../TextEditor'

type Props = {
    state: string[],
    setState: (val: string[]) => void,
    subState: OptionDesc,
    setSubState: (val: OptionDesc) => void
}

const ElectionInput = ({ state, setState, subState, setSubState }: Props) => {
    return (
        <>
            <TagsInput
                size='md'
                label="Liste / Partiti"
                withAsterisk
                description="Inserire il nome delle liste / partiti premendo invio"
                data={[]}
                value={state}
                onChange={(val) => {
                    setState(val)

                    let newSubState: OptionDesc = {}
                    val.forEach(element => {
                        if (!subState[element]) newSubState[element] = [];
                        else newSubState[element] = subState[element];
                    });

                    setSubState(newSubState);
                }
                }
                placeholder="Nome della lista"
            />

            <Stack gap="lg">
                {state.map((val, index) => {
                    return (
                        <Stack gap="0" className={style.candidate} key={index}>
                            <Text fw={700}>{val}</Text>
                            <TagsInput
                                size='md'
                                label="Inserire i candidati della lista / partito"
                                withAsterisk
                                description="Il primo candidato inserito sarà automaticamente il capolista."
                                data={subState[val]}
                                value={subState[val]}
                                onChange={(newState) => {
                                    const newSubState: OptionDesc = { ...subState };
                                    newSubState[val] = newState;

                                    setSubState(newSubState);
                                }}
                                placeholder="Inserisci i candidati" />
                        </Stack>
                    )
                })}
            </Stack>
        </>
    )
}

export default ElectionInput