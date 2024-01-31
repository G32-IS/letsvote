import { Stack, Text, Center, Image } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

type Props = {
    files: FileWithPath[],
    setFiles: (val: FileWithPath[]) => void
}

const ImageDropZone = (props: Props) => {
    const previews = props.files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image h={200} alt="" key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <Stack gap="0">
            <Text fw={500}>Immagine</Text>

            <Dropzone accept={IMAGE_MIME_TYPE} onDrop={props.setFiles}>
                <Center>
                    {props.files.length > 0 ? previews :
                        <Text>Seleziona file o trascinalo qui</Text>
                    }
                </Center>
            </Dropzone>
        </Stack>
    )
}

export default ImageDropZone