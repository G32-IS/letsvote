import React from 'react'

import { Stack, Text } from '@mantine/core'
import ContentTitle from '../ContentTitle'

type Props = {
    message: string
}

const Error = ({message}: Props) => {
  return (
    <ContentTitle title='Error' subtitle={message} align={true}/>
  )
}

export default Error