import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QUERY_KEY = {
    profile: 'profile',
    adminEvents: 'adminEvents',
    events: 'events',
    singleEvent: 'singleEvent/'
};