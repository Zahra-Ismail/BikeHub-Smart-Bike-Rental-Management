import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Booking, Profile, Bike } from '../../lib/database.types';
import { BarChart3, Bike as BikeIcon } from 'lucide-react';
import AdminBookings from './AdminBookings';
import BikeManagement from './BikeManagement';
import Statistics from './Statistics';

export default function AdminDashboard() {
  const [view, setView] = useState<'stats' | 'bookings' | 'bikes'>('stats');
  const [bookings, setBookings] = useState<(Booking & { user: Profile; bike: Bike })[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bookingsResult, bikesResult] = await Promise.all([
        supabase
          .from('bookings')
          .select(`
            *,
            user:profiles!bookings_user_id_fkey(*),
            bike:bikes(*)
          `)
          .order('created_at', { ascending: false }),
        supabase.from('bikes').select('*').order('created_at', { ascending: false })
      ]);

      if (bookingsResult.data) setBookings(bookingsResult.data);
      if (bikesResult.data) setBikes(bikesResult.data);
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
            onClick={() => setView('stats')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'stats' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Statistics</span>
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>All Bookings</span>
          </button>
          <button
            onClick={() => setView('bikes')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'bikes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BikeIcon className="w-4 h-4" />
            <span>Bike Management</span>
          </button>
        </div>

        {view === 'stats' && <Statistics bookings={bookings} bikes={bikes} />}
        {view === 'bookings' && <AdminBookings bookings={bookings} onUpdate={loadData} />}
        {view === 'bikes' && <BikeManagement bikes={bikes} onUpdate={loadData} />}
      </div>
    </div>
  );
}
