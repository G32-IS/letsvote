export interface Credentials {
    email: string;
    password: string;
}

enum EventType {
    ReferendumNazionale,
    ReferendumRegionale,
    ElezioneParlamentare,
    ElezioneRegionale,
    ElezioneProvinciale,
    ElezioneComunale
}

export interface Choice {
    title: string;
    body: string;
}

export interface Event {
    title:string;
    type:EventType,
    body:string,
    choices:Choice[];
    startDate:Date;
    endDate:Date;
}