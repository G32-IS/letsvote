import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

import { CustomError } from "../utils/errors/CustomError";

const sendRequest = async () => {
    const response = await fetch(`${process.env.API_URL}/request/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        credentials: 'include'
    }) 
    const data = await response.json();

    if (!response.ok) {
        switch (response.status) {
            case 422:
                throw new CustomError("Hai già inviato una richiesta, attendi che venga visionata", response.status);
            default:
                throw new CustomError("Si è verificato un errore", response.status);
        }
    }

    return data;
}

export const useSendAdminRequest = () => {
    const client = useQueryClient();
 
    const { mutate: send, error, isPending: isLoading, isSuccess } = useMutation({
        mutationFn: sendRequest,
        onSuccess: () => {
            // client.invalidateQueries({queryKey: [QUERY_KEY.profile]});
        }
    });

    return { send, error, isLoading, isSuccess};
}