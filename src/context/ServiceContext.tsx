import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Bike, Booking, User, Notification } from '../types';

// Initial Mock Data
const INITIAL_BIKES: Bike[] = [
    {
        id: '1',
        name: 'Thunderbolt X1',
        model: 'Mountain E-Bike',
        status: 'available',
        batteryLevel: 85,
        station: 'Library Station',
        pricePerHour: 15,
        condition: 'Excellent',
        imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=600',
        description: 'High-performance electric mountain bike suitable for all campus terrains.',
        rules: ['Helmet required.', 'Return to station.']
    },
    {
        id: '2',
        name: 'City Cruiser S',
        model: 'Urban Commuter',
        status: 'booked',
        batteryLevel: 45,
        station: 'Main Gate',
        pricePerHour: 12,
        condition: 'Good',
        imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: '3',
        name: 'Speedster Pro',
        model: 'Road Bike',
        status: 'available',
        batteryLevel: 92,
        station: 'Sports Complex',
        pricePerHour: 20,
        condition: 'Like New',
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: '4',
        name: 'Eco Move',
        model: 'City E-Bike',
        status: 'maintenance',
        batteryLevel: 0,
        station: 'Library Station',
        pricePerHour: 10,
        condition: 'Needs Repair',
        imageUrl: 'https://images.unsplash.com/photo-1507035895480-2b3156c311a6?auto=format&fit=crop&q=80&w=600'
    },
];

const INITIAL_USER: User = {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    studentId: '2024001'
};

interface ServiceContextType {
    user: User | null;
    bikes: Bike[];
    bookings: Booking[];
    notifications: Notification[];
    activeBooking: Booking | null;

    // Actions
    bookBike: (bikeId: string, startTime: Date, durationHours: number) => Promise<boolean>;
    returnBike: (bookingId: string) => Promise<boolean>;
    cancelBooking: (bookingId: string) => Promise<boolean>;
    updateBikeStatus: (bikeId: string, status: Bike['status']) => void;
    markNotificationRead: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useService = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useService must be used within a ServiceProvider');
    }
    return context;
};

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
    // Load from localStorage or use initial
    const [user] = useState<User>(INITIAL_USER);

    const [bikes, setBikes] = useState<Bike[]>(() => {
        const saved = localStorage.getItem('bikes');
        return saved ? JSON.parse(saved) : INITIAL_BIKES;
    });

    const [bookings, setBookings] = useState<Booking[]>(() => {
        const saved = localStorage.getItem('bookings');
        return saved ? JSON.parse(saved) : [];
    });

    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', type: 'info', message: 'Welcome to Campus Bike System!', time: 'Just now', read: false }
    ]);

    // Persist changes
    useEffect(() => {
        localStorage.setItem('bikes', JSON.stringify(bikes));
    }, [bikes]);

    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }, [bookings]);

    const activeBooking = bookings.find(b => b.status === 'active') || null;

    const bookBike = async (bikeId: string, startTime: Date, durationHours: number): Promise<boolean> => {
        const bike = bikes.find(b => b.id === bikeId);
        if (!bike || bike.status !== 'available') return false;

        if (activeBooking) {
            alert("You already have an active booking!");
            return false;
        }

        const newBooking: Booking = {
            id: `BK-${Date.now()}`,
            userId: user.id,
            bikeId: bike.id,
            bikeName: bike.name,
            bikeImage: bike.imageUrl,
            startTime: startTime,
            endTime: new Date(startTime.getTime() + durationHours * 60 * 60 * 1000),
            status: 'active',
            totalPrice: bike.pricePerHour * durationHours,
            returnLocation: bike.station // Simple assumption
        };

        setBookings(prev => [newBooking, ...prev]);
        updateBikeStatus(bikeId, 'in_use'); // Or 'booked' depending on immediate usage

        // Add Notification
        setNotifications(prev => [{
            id: Date.now().toString(),
            type: 'success',
            message: `Booking confirmed for ${bike.name}`,
            time: 'Just now',
            read: false
        }, ...prev]);

        return true;
    };

    const returnBike = async (bookingId: string): Promise<boolean> => {
        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) return false;

        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b));
        updateBikeStatus(booking.bikeId, 'available');
        return true;
    };

    const cancelBooking = async (bookingId: string): Promise<boolean> => {
        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) return false;

        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
        updateBikeStatus(booking.bikeId, 'available');
        return true;
    };

    const updateBikeStatus = (bikeId: string, status: Bike['status']) => {
        setBikes(prev => prev.map(b => b.id === bikeId ? { ...b, status } : b));
    };

    const markNotificationRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <ServiceContext.Provider value={{
            user,
            bikes,
            bookings,
            notifications,
            activeBooking,
            bookBike,
            returnBike,
            cancelBooking,
            updateBikeStatus,
            markNotificationRead
        }}>
            {children}
        </ServiceContext.Provider>
    );
};
