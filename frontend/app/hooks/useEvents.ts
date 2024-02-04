import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchEvents = async () => {
    const response = await fetch(`${process.env.API_URL}/event/get/all`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }
    
    return data.events;
};

export const useEvents = () => {
    const {
        isLoading,
        error,
        data: events,
    } = useQuery({
        queryKey: [QUERY_KEY.events],
        queryFn: fetchEvents,
    });

    return { events, isLoading, error };
};
