import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchRequests = async () => {
    const response = await fetch(`${process.env.API_URL}/request/get/all`,
        { credentials: 'include' }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.requests;
};

export const useRequests = () => {
    const {
        isLoading,
        error,
        data: requests,
    } = useQuery({
        queryKey: [QUERY_KEY.requests],
        queryFn: fetchRequests
    });

    return { requests, isLoading, error };
};
