import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

import { CustomError } from "../utils/errors/CustomError";

export const fetchSingleEvent = async (eventId: string) => {
    const response = await fetch(`${process.env.API_URL}/event/get/single/${eventId}`,
        {
            credentials: 'include'
        });

    const data = await response.json();

    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new CustomError("Non sei autorizzato", response.status)
                break;
            case 404:
                throw new CustomError("C'è stato un errore", response.status)
                break;
            case 500:
                throw new CustomError("C'è stato un errore", response.status)
                break;
            default:
                throw new CustomError("C'è stato un errore", response.status)
                break;
        }

        throw new Error(data.message);
    }

    return data.event;
};

export const useSingleEvent = (eventId: string) => {
    const {
        isLoading,
        error,
        data: singleEvent,
    } = useQuery({
        queryKey: [QUERY_KEY.singleEvent + eventId],
        queryFn: _ => fetchSingleEvent(eventId),
    });

    return { singleEvent, isLoading, error };
};
