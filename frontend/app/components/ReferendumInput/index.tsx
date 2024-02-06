"use client"

import { Stack, Text, TagsInput, Button } from "@mantine/core"
import TextEditor from '../TextEditor'
type Props = {
    state: string[],
    setState: (val: string[]) => void,

}

const ReferendumInput = ({ state, setState }: Props) => {
    return (
        <>
            < TagsInput
                size='md'
                label="Opzioni"
                description="Le opzioni scelte corrispondono alle alternative che appariranno al votante.
                Premere invio dopo ogni opzione per aggiungerne un'altra."
                data={[]}
                value={state}
                onChange={setState}
                placeholder="Inserisci le opzioni"
            />
        </>
    )
}

export default ReferendumInput