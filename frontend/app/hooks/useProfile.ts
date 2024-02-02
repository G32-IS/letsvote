import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export const fetchProfile = async () => {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Not authorized')
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
        retry: false
    });

    return { user, isLoading, error };
};
