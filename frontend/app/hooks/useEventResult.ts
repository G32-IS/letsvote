import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchEventResult = async (id: string) => {
    const response = await fetch(`${process.env.API_URL}/event/get/votes/${id}`, {
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.votes;
};

export const useEventResult = (id: string) => {
    const {
        isLoading,
        error,
        data: result,
    } = useQuery({
        queryKey: [QUERY_KEY.singleEventResult+id],
        queryFn: _ => fetchEventResult(id),
        retry: false,
        refetchInterval: 3000
    });

    return { result, isLoading, error };
};
