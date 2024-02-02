import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { Credentials } from "../types";

const loginFn = async ({email, password}: Credentials): Promise<Credentials> => {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({email, password})
    }) 
    
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

export const useLogin = () => {
    const client = useQueryClient();
 
    const { mutate: login, error, isPending: isLoading } = useMutation({
        mutationFn: loginFn,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.profile]});
        }
    });

    return { login, error, isLoading };
}