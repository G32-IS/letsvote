"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/client";

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
