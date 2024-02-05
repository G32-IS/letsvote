import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { Credentials } from "../types";

import { CustomError } from "../utils/errors/CustomError";

const loginFn = async ({email, password}: Credentials): Promise<Credentials> => {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({user:{email, password}})
    }) 
    
    const result = await response.json();

    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new CustomError("Non autorizzato", response.status);
            case 404:
                throw new CustomError("Utente non trovato", response.status);
            case 500:
                throw new CustomError("Si è verificato un errore", response.status);
            default:
                throw new Error(result.message);
        }
    }

    return result;
}

export const useLogin = () => {
    const client = useQueryClient();
 
    const { mutate: login, error, isPending: isLoading, isSuccess } = useMutation({
        mutationFn: loginFn,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.profile]});
        }
    });

    return { login, error, isLoading, isSuccess };
}