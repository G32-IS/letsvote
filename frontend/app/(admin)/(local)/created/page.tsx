"use client"

import { Button } from "@mantine/core"

import ContentTitle from "../../../components/ContentTitle"

import { useRouter } from "next/navigation"
import { useProfile } from "@/app/hooks/useProfile"
import Loading from "@/app/components/Loading"

type Props = {}

const Created = (props: Props) => {
  const router = useRouter();

  const { user, error: userError, isLoading: isUserLoading } = useProfile();

  if (isUserLoading) return <Loading />
  else if (userError) {
    router.push("/error");
    return <></>;
  }
  else if (user.role != "Admin") {
    router.push("/error");
    return <></>;
  }

  return (
    <>
      <ContentTitle title="Congratulazioni" subtitle="Hai creato correttamente una votazione" align={true} />
      <Button onClick={() => router.push("/events")}>Torna alla lista delle votazioni</Button>
    </>
  )
}

export default Created