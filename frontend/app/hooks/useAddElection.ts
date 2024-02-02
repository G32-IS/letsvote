import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { Event } from "../types"


const postEvent = async (Event: Event): Promise<Event> => {
    const response = await fetch(`${process.env.API_URL}/vote/createVote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(Event)
    }) 

    return await response.json();
}

export const useAddEvent = () => {
    const client = useQueryClient();
 
    const { mutate: addEvent } = useMutation({
        mutationFn: postEvent,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.adminEvents]});
        }
    });

    return { addEvent };
}