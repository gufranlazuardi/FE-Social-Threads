// providers/AppProvider.tsx
"use client"

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const { getCurrentUser } = useAuthStore();

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}