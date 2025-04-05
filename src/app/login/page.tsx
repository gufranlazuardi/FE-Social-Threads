'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <LoginForm />
        </div>
    );
}
