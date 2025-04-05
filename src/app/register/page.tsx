'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <RegisterForm />
        </div>
    );
}