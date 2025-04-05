import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../lib/axiosWithConfig';

export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post('/api/auth/login', { email, password });
                    const { token, user } = response.data.data;
                    set({
                        token,
                        user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    localStorage.setItem('token', token);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false
                    });
                }
            },

            register: async (name, username, email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post('/api/auth/register', {
                        name,
                        username,
                        email,
                        password
                    });
                    const { token, user } = response.data.data;
                    set({
                        token,
                        user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    localStorage.setItem('token', token);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Registration failed',
                        isLoading: false
                    });
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                });
            },

            getCurrentUser: async () => {
                const token = localStorage.getItem('token');
                if (!token) return;

                set({ isLoading: true });
                try {
                    const response = await axios.get('/api/auth/me');
                    set({
                        user: response.data.data,
                        isAuthenticated: true,
                        isLoading: false
                    });
                } catch (error) {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false
                    });
                    localStorage.removeItem('token');
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token }),
        }
    )
);
