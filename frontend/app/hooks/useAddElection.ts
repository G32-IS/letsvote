import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";

interface Election {
    name: string;
}

const postElection = async (election: Election): Promise<Election> => {
    const response = await fetch(`${process.env.API_URL}/vote/createVote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(election)
    }) 

    return await response.json();
}

export const useAddElection = () => {
    const client = useQueryClient();
 
    const { mutate: addElection } = useMutation({
        mutationFn: postElection,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.adminElections]});
        }
    });

    return { addElection };
}