import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Bike, Booking } from '../../lib/database.types';
import BikeList from './BikeList';
import BookingList from './BookingList';
import ActiveBooking from './ActiveBooking';
import { Calendar, Clock, Receipt } from 'lucide-react';

export default function UserDashboard() {
  const { profile } = useAuth();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<'browse' | 'bookings' | 'active'>('browse');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile?.id]);

  const loadData = async () => {
    if (!profile?.id) return;

    try {
      const [bikesResult, bookingsResult] = await Promise.all([
        supabase.from('bikes').select('*').eq('status', 'available'),
        supabase.from('bookings').select('*').eq('user_id', profile.id).order('created_at', { ascending: false })
      ]);

      if (bikesResult.data) setBikes(bikesResult.data);
      if (bookingsResult.data) {
        setBookings(bookingsResult.data);
        const active = bookingsResult.data.find(b => b.status === 'active');
        if (active) {
          setActiveBooking(active);
          setView('active');
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setView('browse')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'browse' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Browse Bikes</span>
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>My Bookings</span>
          </button>
          {activeBooking && (
            <button
              onClick={() => setView('active')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Active Rental</span>
            </button>
          )}
        </div>

        {view === 'browse' && <BikeList bikes={bikes} onBookingComplete={loadData} />}
        {view === 'bookings' && <BookingList bookings={bookings} />}
        {view === 'active' && activeBooking && <ActiveBooking booking={activeBooking} onUpdate={loadData} />}
      </div>
    </div>
  );
}
