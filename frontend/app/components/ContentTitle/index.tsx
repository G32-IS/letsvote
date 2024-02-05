import { Title, Text, Stack } from "@mantine/core"

type Props = {
    title: string,
    subtitle: string,
    align: boolean
}

const ContentTitle = ({title,subtitle,align = false}: Props) => {
    return (
        <Stack gap="0" align={align ? "center" : "flex-start"}>
            <Title order={1}>{title}</Title>
            <Text>{subtitle}</Text>
        </Stack>
    )
}

export default ContentTitle