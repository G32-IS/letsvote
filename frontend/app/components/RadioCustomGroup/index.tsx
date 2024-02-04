import React from 'react'
import { RadioGroup, Group, Radio, Text } from '@mantine/core'

type Props = {
    state: string | undefined | number,
    setState: (val: any) => void,
    values: string[],
    name: string,
    label: string
}

const RadioCustomGroup = (props: Props) => {
    return (
        <RadioGroup
            value={String(props.state)}
            // onChange={props.setState}
            variant="vertical"
            label={props.label}
            name={props.name}
            required
            withAsterisk
            size='md'
        >
            {props.values.map((val, index) => {
                return <Group
                    gap="xs"
                    key={index}
                    align='flex-start'
                    mt={5}
                    onClick={() => props.setState(val)}
                >
                    <Radio value={val} />
                    <Text>{val.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</Text>
                </Group>;
            })}
        </RadioGroup>
    )
}

export default RadioCustomGroup