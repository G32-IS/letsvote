import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { CustomError } from "../utils/errors/CustomError";

const removeEvent = async (id:string) => {
    const response = await fetch(`${process.env.API_URL}/event/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }, 
        credentials: 'include'
    }) 
    const data = await response.json();

    if (!response.ok) {
        //switch sugli status di response 401, 404, 500
        switch(response.status) {
            case 401:
                throw new CustomError("Non sei autorizzato a cancellare questo evento", response.status);
            case 404:
                throw new CustomError("Evento non trovato", response.status);
            default:
                throw new CustomError("Si è verificato un errore", response.status);
        }
    }

    return data;
}

export const useRemoveEvent = () => {
    const client = useQueryClient();
 
    const { mutate: deleteEvent, error, isPending: isLoading, isSuccess } = useMutation({
        mutationFn: removeEvent,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.events]});
        },
    });

    return { deleteEvent, error, isLoading, isSuccess };
}