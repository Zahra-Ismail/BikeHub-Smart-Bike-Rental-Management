import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Booking, Profile, Bike } from '../../lib/database.types';
import { ClipboardList, CheckCircle } from 'lucide-react';
import BookingApproval from './BookingApproval';
import ReturnInspection from './ReturnInspection';

export default function WardenDashboard() {
  const [bookings, setBookings] = useState<(Booking & { user: Profile; bike: Bike })[]>([]);
  const [view, setView] = useState<'approvals' | 'returns'>('approvals');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [view]);

  const loadBookings = async () => {
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          user:profiles!bookings_user_id_fkey(*),
          bike:bikes(*)
        `)
        .order('created_at', { ascending: false });

      if (view === 'approvals') {
        query = query.in('status', ['pending', 'approved']);
      } else {
        query = query.eq('status', 'active');
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
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
            onClick={() => setView('approvals')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'approvals' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Booking Approvals</span>
          </button>
          <button
            onClick={() => setView('returns')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'returns' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Return Inspections</span>
          </button>
        </div>

        {view === 'approvals' && <BookingApproval bookings={bookings} onUpdate={loadBookings} />}
        {view === 'returns' && <ReturnInspection bookings={bookings} onUpdate={loadBookings} />}
      </div>
    </div>
  );
}
