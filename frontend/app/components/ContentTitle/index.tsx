import { Title, Text, Stack } from "@mantine/core"

type Props = {
    title: string,
    subtitle: string
}

const ContentTitle = (props: Props) => {
    return (
        <Stack gap="0">
            <Title order={1}>{props.title}</Title>
            <Text>{props.subtitle}</Text>
        </Stack>
    )
}

export default ContentTitle