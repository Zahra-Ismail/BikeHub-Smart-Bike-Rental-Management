import type { Role } from '../config/constants';

export interface User {
    id: string;
    email: string;
    displayName: string;
    role: Role;
    avatarUrl?: string;
    createdAt: Date;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
