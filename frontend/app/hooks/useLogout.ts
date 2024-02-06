import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../react-query/client";
import { useRouter } from "next/router";

const logoutFn = async () => {
    const response = await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    }) 
    
    const result = await response.status;
    return result;
}

export const useLogout = () => {
    const client = useQueryClient();
 
    const { mutate: logout, isSuccess, error, isPending: isLoading } = useMutation({
        mutationFn: logoutFn,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [QUERY_KEY.profile]});
        },
    });

    return { logout, error, isLoading, isSuccess};
}