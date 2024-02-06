import { CustomError } from "../utils/errors/CustomError";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchProfile = async () => {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
        credentials: 'include'
    });

    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new CustomError('Non autorizzato', response.status);
            case 500:
                throw new CustomError('Errore interno del server', response.status);
            default:
                throw new CustomError('Si è verificato un errore', response.status);
        }
    }

    const data = await response.json();
    return data.user;
};

export const useProfile = () => {
    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: [QUERY_KEY.profile],
        queryFn: fetchProfile,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 50,
    });

    return { user, isLoading, error };
};
