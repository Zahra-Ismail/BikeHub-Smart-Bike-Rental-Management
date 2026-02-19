import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Booking, Profile, Bike } from '../../lib/database.types';
import { CheckCircle, XCircle, User, Calendar, Clock, ClipboardList } from 'lucide-react';

interface BookingApprovalProps {
  bookings: (Booking & { user: Profile; bike: Bike })[];
  onUpdate: () => void;
}

export default function BookingApproval({ bookings, onUpdate }: BookingApprovalProps) {
  const [processing, setProcessing] = useState<string | null>(null);

  const handleApprove = async (bookingId: string, currentStatus: string) => {
    setProcessing(bookingId);
    try {
      const updates: any = {
        warden_approved: true,
      };

      if (currentStatus === 'pending') {
        updates.status = 'approved';
      }

      const { error } = await supabase
        .from('bookings')
        .update(updates)
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

  const handleReject = async (bookingId: string) => {
    setProcessing(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'rejected',
          warden_approved: false,
        })
        .eq('id', bookingId);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking');
    } finally {
      setProcessing(null);
    }
  };

  const handleActivate = async (bookingId: string, bikeId: string) => {
    setProcessing(bookingId);
    try {
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ status: 'active' })
        .eq('id', bookingId);

      if (bookingError) throw bookingError;

      const { error: bikeError } = await supabase
        .from('bikes')
        .update({ status: 'rented' })
        .eq('id', bikeId);

      if (bikeError) throw bikeError;

      onUpdate();
    } catch (error) {
      console.error('Error activating booking:', error);
      alert('Failed to activate booking');
    } finally {
      setProcessing(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No bookings pending approval</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
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
              <p className="text-2xl font-bold text-gray-900">${booking.total_cost}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
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
          </div>

          <div className="flex items-center space-x-2 mb-4 text-sm">
            <span className={`w-2 h-2 rounded-full ${booking.warden_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className="text-gray-600">Warden {booking.warden_approved ? 'Approved' : 'Pending'}</span>
            <span className={`w-2 h-2 rounded-full ${booking.admin_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className="text-gray-600">Admin {booking.admin_approved ? 'Approved' : 'Pending'}</span>
          </div>

          <div className="flex space-x-3">
            {booking.status === 'pending' && !booking.warden_approved && (
              <>
                <button
                  onClick={() => handleApprove(booking.id, booking.status)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(booking.id)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </>
            )}
            {booking.status === 'approved' && booking.warden_approved && booking.admin_approved && (
              <button
                onClick={() => handleActivate(booking.id, booking.bike_id)}
                disabled={processing === booking.id}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Activate Rental</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

