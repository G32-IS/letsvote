import { useQuery } from "@tanstack/react-query";

const fetchTest = async () => {
    const response = await fetch(`${process.env.API_URL}/test/users`);
    const data = await response.text();
    
    return data;
}

export const useTest = () => {
    const { isLoading, error, data: test } = useQuery({
        queryKey: ['test'],
        queryFn: fetchTest,
    })

    return {test, isLoading, error};
};