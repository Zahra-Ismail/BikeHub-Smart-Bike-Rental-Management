export const ROLES = {
    GUEST: 'guest',
    USER: 'user',
    WARDEN: 'warden',
    ADMIN: 'admin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const APP_NAME = 'EcoRide Campus';

export const ROUTES = {
    // Public
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    UNAUTHORIZED: '/unauthorized',

    // User
    USER_DASHBOARD: '/dashboard',
    BROWSE_BIKES: '/bikes',
    BIKE_DETAILS: '/bikes/:id',
    ACTIVE_BOOKING: '/booking/active',
    BOOKING_CONFIRMATION: '/booking/confirm',
    BOOKING_HISTORY: '/booking/history',
    RECEIPT: '/booking/receipt/:id',
    PROFILE: '/profile',

    // Warden
    WARDEN_DASHBOARD: '/warden',
    WARDEN_REQUESTS: '/warden/requests',
    WARDEN_CHECKOUT: '/warden/checkout',
    WARDEN_RETURN: '/warden/return',
    WARDEN_BIKES: '/warden/bikes',

    // Admin
    ADMIN_DASHBOARD: '/admin',
    ADMIN_USERS: '/admin/users',
    ADMIN_BOOKINGS: '/admin/bookings',
    ADMIN_REPORTS: '/admin/reports',
} as const;

export const BIKE_STATUS = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    IN_USE: 'in_use',
    MAINTENANCE: 'maintenance',
} as const;

export type BikeStatus = typeof BIKE_STATUS[keyof typeof BIKE_STATUS];
