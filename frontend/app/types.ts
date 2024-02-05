export interface Credentials {
    email: string;
    password: string;
}

export enum EventType {
    ReferendumNazionale=0,
    ReferendumRegionale=1,
    ElezioneParlamentare=2,
    ElezioneRegionale=3,
    ElezioneProvinciale=4,
    ElezioneComunale=5
}

export interface Choice {
    title: string;
    body: string;
}

export interface EventInterface {
    title:string;
    type:EventType,
    body:string,
    choices:Choice[];
    startDate:Date;
    endDate:Date;
}

export interface Pob {
    id:string;
    locality:string;
    region:string;
}

export interface EventFromDb {
    authorId: string;
    id:string;
    title:string;
    type:EventType,
    body:string,
    choices:Choice[];
    startDate:Date;
    endDate:Date;
    pob: Pob;
}

export interface OptionDesc {
    [key: string]: string[]
}