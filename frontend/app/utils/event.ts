import { EventFromDb, EventType, Pob } from "../types";

export const isReferendum = (eventType: EventType): boolean => {
    return String(eventType).includes("Referendum");
}

export const matchPoB = (userPob: Pob, event: EventFromDb) => {
    switch (event.type) {
        case EventType.ElezioneComunale:
            return userPob.locality === event.pob.locality;
        case EventType.ElezioneProvinciale:
            return userPob.region === event.pob.region;
        case EventType.ElezioneRegionale:
            return false;
        case EventType.ReferendumRegionale:
            return false;
        default:
            return true;
    }
}