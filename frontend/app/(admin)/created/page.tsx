"use client"

import { Button } from "@mantine/core"

import ContentTitle from "../../components/ContentTitle"

import { useRouter } from "next/navigation"
import { useEvents } from "@/app/hooks/useEvents"

type Props = {}

const Created = (props: Props) => {
  const router = useRouter();
  // const {events} = useEvents()
  return (
    <>
        <ContentTitle title="Congratulazioni" subtitle="Hai creato correttamente una votazione" align={true}  />
        <Button onClick={() => router.push("/events")}>Torna alla lista delle votazioni</Button>
    </>
  )
}

export default Created