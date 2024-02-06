"use client"

import { Button } from "@mantine/core"

import ContentTitle from "../../../components/ContentTitle"

import { useRouter } from "next/navigation"
import { useProfile } from "@/app/hooks/useProfile"
import Loading from "@/app/components/Loading"
import { useEffect } from "react"

type Props = {}

const Created = (props: Props) => {
  const router = useRouter();

  const { user, error: userError, isLoading: isUserLoading } = useProfile();

  useEffect(() => {
    if (userError) {
      router.push("/error");
    }
    else if (user?.role != "SysAdmin") {
      router.push("/error");
    }
  }, [userError, user, router])

  if (isUserLoading || (!user && !userError)) return <Loading />

  return (
    <>
      <ContentTitle title="Congratulazioni" subtitle="Hai creato correttamente una votazione" align={true} />
      <Button onClick={() => router.push("/events")}>Torna alla lista delle votazioni</Button>
    </>
  )
}

export default Created