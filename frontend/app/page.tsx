"use client";
import { CustomError } from "./utils/errors/CustomError";

import Loading from "./components/Loading";
import ContentTitle from "./components/ContentTitle";

import { useProfile } from "./hooks/useProfile";
import { Stack, Title, Text } from "@mantine/core";
import Link from "next/link";

export default function Home() {
    const { user, isLoading, error } = useProfile();

    if (isLoading) return <Loading />;
    if (error && !(error instanceof CustomError))
        return <ContentTitle title="Errore" subtitle="Si è verificato un errore" align={true} />;

    console.log(user)

    return (
        <Stack w="100%" gap="md">
            <Stack gap="0">
                <Title order={2}>letsvote</Title>
                <Text>Benvenuto su letsvote! Scopri come votare online in modo semplice e sicuro. Grazie per essere parte della democrazia digitale italiana ❤️ !</Text>
            </Stack>
            <Stack gap="0">
                <Title order={2}>{`Cos'è letsvote?`}</Title>
                <Text>{`letsvote è un'innovativa piattaforma di voto online progettata per consentire ai cittadini italiani di esercitare il loro diritto al voto in modo semplice, sicuro ed efficiente. L'applicazione è concepita per essere accessibile attraverso SPID (Sistema Pubblico di Identità Digitale), garantendo così l'autenticità e la privacy delle votazioni. letsvote rappresenta un passo avanti verso l'integrazione della tecnologia nelle pratiche democratiche, agevolando la partecipazione attiva dei cittadini alle elezioni.`}</Text>
            </Stack>
            <Stack gap="0">
                <Title order={2}>Come funziona letsvote?</Title>
                <Link href="/guide">pagina di guida</Link>
                <Text>{`letsvote è progettato con un'interfaccia intuitiva e user-friendly. Dopo esserti autenticato con il tuo SPID, potrai accedere alla scheda elettorale online, dove troverai tutti i candidati e le opzioni di voto relative alle elezioni in corso. Segui attentamente le istruzioni fornite e seleziona le tue preferenze. Dopo aver confermato le tue scelte, il tuo voto sarà registrato in modo sicuro e anonimo. Per una guida dettagliata su come utilizzare letsvote, consulta la nostra pagina di guida`}</Text>
            </Stack>
            <Stack gap="0">
                <Title order={2}>Hai domande?</Title>
                <Text>Se hai domande, dubbi o hai bisogno di assistenza, siamo qui per aiutarti! Puoi contattarci tramite i seguenti canali:</Text>
                <Stack mt="5px" mb="5px" gap="0">
                    <Text>- Email: info@letsvote.it</Text>
                    <Text>- Assistenza telefonica: +39 XXX XXX XXXX</Text>
                </Stack>
                <Text>Siamo impegnati a fornire un servizio di alta qualità e a garantire una partecipazione democratica senza intoppi. La tua opinione è fondamentale, e siamo pronti ad assisterti in ogni fase del processo elettorale. Grazie per scegliere letsvote e contribuire a rafforzare la democrazia digitale in Italia.</Text>
            </Stack>
            <Stack gap="0">
                <Title order={2}>Codice sorgente Open Source</Title>
                <Link href="https://github.com/G32-IS/letsvote">letsvote GitHub Repository</Link>
                <Text>{`Vuoi esplorare il cuore di letsvote? Se sei interessato a comprendere il funzionamento interno dell'applicazione o desideri contribuire al suo sviluppo, sei il benvenuto! La nostra repository GitHub è completamente open source.
                La repository contiene il codice sorgente completo di letsvote, consentendoti di esaminare il processo di sviluppo, proporre miglioramenti o personalizzare l'applicazione per adattarla alle tue esigenze specifiche. Siamo appassionati della collaborazione e apprezziamo il contributo della community per rendere letsvote sempre migliore.
                    Non esitare a dare un'occhiata al codice, a fornire feedback o a proporre nuove funzionalità. La tua partecipazione è fondamentale per costruire una piattaforma di voto digitale robusta e trasparente. Grazie per essere parte della nostra missione di promuovere la democrazia digitale in Italia!`}
                </Text>
            </Stack>
        </Stack >
    );
}
