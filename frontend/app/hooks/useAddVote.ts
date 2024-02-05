import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

const postVote = async (vote: { choiceId:string, eventId:string }) => {
    const response = await fetch(`${process.env.API_URL}/vote/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({vote: vote}),
        credentials: 'include'
    }) 
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const useAddVote = () => {
    const client = useQueryClient();
 
    const { mutate: vote, error, isPending: isLoading, isSuccess } = useMutation({
        mutationFn: postVote,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.votes]});
        }
    });

    return { vote, error, isLoading, isSuccess};
}