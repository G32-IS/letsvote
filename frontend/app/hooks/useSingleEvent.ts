import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchSingleEvent = async (eventId: string) => {
    const response = await fetch(`${process.env.API_URL}/event/get/single/${eventId}`,
    {
        credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
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
