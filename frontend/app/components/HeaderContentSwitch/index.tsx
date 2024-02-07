"use client"

import Link from 'next/link'

type Props = {
    role: string
}

const HeaderContentSwitch = ({ role }: Props) => {

    const getContent = (role: string) => {
        switch (role) {
            case "SysAdmin":
                return <>
                    <Link href="/requests">Gestisci richieste</Link>
                </>
                break;

            case "Admin":
                return (<>
                    <Link href="/create">Crea una votazione</Link>
                </>)
                break;

            default:
                return <Link href="/guide">Guida introduttiva</Link>;
                break;
        }
    }

    return (
        getContent(role)
    )
}

export default HeaderContentSwitch