import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Booking, Profile, Bike } from '../../lib/database.types';
import { CheckCircle, XCircle, User, Calendar, Clock } from 'lucide-react';

interface AdminBookingsProps {
  bookings: (Booking & { user: Profile; bike: Bike })[];
  onUpdate: () => void;
}

export default function AdminBookings({ bookings, onUpdate }: AdminBookingsProps) {
  const [processing, setProcessing] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'active' | 'returned'>('all');

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const handleApprove = async (bookingId: string) => {
    setProcessing(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          admin_approved: true,
        })
        .eq('id', bookingId);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error approving booking:', error);
      alert('Failed to approve booking');
    } finally {
      setProcessing(null);
    }
  };

  const handleConfirmReturn = async (booking: Booking & { bike: Bike }) => {
    setProcessing(booking.id);
    try {
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          status: 'returned',
        })
        .eq('id', booking.id);

      if (bookingError) throw bookingError;

      const { error: bikeError } = await supabase
        .from('bikes')
        .update({ status: 'available' })
        .eq('id', booking.bike_id);

      if (bikeError) throw bikeError;

      onUpdate();
    } catch (error) {
      console.error('Error confirming return:', error);
      alert('Failed to confirm return');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'active', 'returned'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      ) : (
        filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.bike.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{booking.user.full_name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(booking.start_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{booking.expected_duration_hours} hours</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${booking.total_cost + booking.overtime_charge + booking.damage_charge}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                  booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'returned' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Start Time</p>
                <p className="font-medium text-gray-900">{new Date(booking.start_time).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">End Time</p>
                <p className="font-medium text-gray-900">{new Date(booking.end_time).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">User Email</p>
                <p className="font-medium text-gray-900">{booking.user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Booking ID</p>
                <p className="font-medium text-gray-900">{booking.id.slice(0, 8)}</p>
              </div>
              {booking.overtime_charge > 0 && (
                <div>
                  <p className="text-red-600 mb-1">Overtime Charge</p>
                  <p className="font-medium text-red-600">${booking.overtime_charge}</p>
                </div>
              )}
              {booking.damage_charge > 0 && (
                <div>
                  <p className="text-red-600 mb-1">Damage Charge</p>
                  <p className="font-medium text-red-600">${booking.damage_charge}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${booking.warden_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className="text-gray-600">Warden {booking.warden_approved ? 'Approved' : 'Pending'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${booking.admin_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className="text-gray-600">Admin {booking.admin_approved ? 'Approved' : 'Pending'}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {!booking.admin_approved && booking.status === 'pending' && (
                <button
                  onClick={() => handleApprove(booking.id)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
              )}
              {booking.status === 'active' && (
                <button
                  onClick={() => handleConfirmReturn(booking)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Return</span>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
