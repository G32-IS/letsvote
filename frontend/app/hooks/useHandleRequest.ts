import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

const handleRequest = async (request) => {
    const response = await fetch(`${process.env.API_URL}/request/handle`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({request: request}),
        credentials: 'include'
    }) 
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const useHandleRequest = () => {
    const client = useQueryClient();
 
    const { mutate: handle, error, isPending: isLoading, isSuccess } = useMutation({
        mutationFn: handleRequest,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.requests]});
        }
    });

    return { handle, error, isLoading, isSuccess};
}