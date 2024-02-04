import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { EventInterface } from "../types"


const postEvent = async (Event: EventInterface): Promise<EventInterface> => {
    console.log(Event);

    const response = await fetch(`${process.env.API_URL}/event/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({event: Event}),
        credentials: 'include'
    }) 
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
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