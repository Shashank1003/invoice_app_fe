"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX, useState } from "react";

interface TanstackProviderProps {
    children: React.ReactNode;
}

export const TanstackProvider = ({
    children,
}: TanstackProviderProps): JSX.Element => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
