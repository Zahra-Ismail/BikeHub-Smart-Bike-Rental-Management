export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'warden' | 'admin';
    studentId?: string;
}

export interface Bike {
    id: string;
    name: string;
    model: string;
    status: 'available' | 'booked' | 'maintenance' | 'in_use';
    batteryLevel: number;
    station: string;
    pricePerHour: number;
    imageUrl?: string;
    condition?: string;
    description?: string;
    rules?: string[];
}

export interface Booking {
    id: string;
    userId: string;
    bikeId: string;
    bikeName: string; // Denormalized for easier display
    bikeImage?: string;
    startTime: Date;
    endTime: Date;
    status: 'active' | 'completed' | 'cancelled';
    totalPrice: number;
    returnLocation: string;
}

export interface Notification {
    id: string;
    type: 'info' | 'warning' | 'success';
    message: string;
    time: string;
    read: boolean;
}
