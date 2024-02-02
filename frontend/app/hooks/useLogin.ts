import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

export interface Login {
    email: string;
    password: string;
}

const loginFn = async ({email, password}: Login): Promise<Login> => {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({email, password})
    }) 
    
    const result = await response.json();
    console.log(result);

    return result;
}

export const useLogin = () => {
    const client = useQueryClient();
 
    const { mutate: login } = useMutation({
        mutationFn: loginFn,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.profile]});
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return { login };
}