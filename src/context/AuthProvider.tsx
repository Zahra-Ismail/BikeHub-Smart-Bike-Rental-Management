import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '../types/user';

import { ROLES } from '../config/constants';

// Mock user for development
const MOCK_USER: User = {
    id: '1',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    role: ROLES.USER,
    createdAt: new Date(),
};

interface AuthContextType extends AuthState {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    register: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Simulate initial auth check
        const checkAuth = async () => {
            try {
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // Check localStorage or verify token here
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    // For now, we will just use the mock user if "logged in" flag is mock-set
                    // Or just default to not logged in.
                    // Let's keep it simple: initially not logged in.
                    setState(prev => ({ ...prev, isLoading: false }));
                } else {
                    setState(prev => ({ ...prev, isLoading: false }));
                }
            } catch (error) {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };

        checkAuth();
    }, []);

    const login = async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setState({
            user: MOCK_USER,
            isAuthenticated: true,
            isLoading: false,
        });
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
    };

    const logout = async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        await new Promise(resolve => setTimeout(resolve, 500));

        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
        localStorage.removeItem('user');
    };

    const register = async () => {
        // Same as login for now
        await login();
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
