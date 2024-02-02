import { useQuery } from "@tanstack/react-query";

export const fetchTest = async () => {
    const response = await fetch(`${process.env.API_URL}/test/userCount`);
    const data = await response.json();
    return data;
};

export const useTest = () => {
    const {
        isLoading,
        error,
        data: test,
    } = useQuery({
        queryKey: ["test"],
        queryFn: fetchTest,
    });

    return { test, isLoading, error };
};
