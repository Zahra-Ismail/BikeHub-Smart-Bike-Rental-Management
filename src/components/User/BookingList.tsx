import type { Booking } from '../../lib/database.types';
import { Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
}

export default function BookingList({ bookings }: BookingListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'returned': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No bookings yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="capitalize">{booking.status}</span>
                </span>
              </div>
              <p className="text-sm text-gray-500">Booking ID: {booking.id.slice(0, 8)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${booking.total_cost}</p>
              {booking.overtime_charge > 0 && (
                <p className="text-sm text-red-600">+${booking.overtime_charge} overtime</p>
              )}
              {booking.damage_charge > 0 && (
                <p className="text-sm text-red-600">+${booking.damage_charge} damage</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Start Time</p>
              <p className="font-medium text-gray-900">
                {new Date(booking.start_time).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">End Time</p>
              <p className="font-medium text-gray-900">
                {new Date(booking.end_time).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Duration</p>
              <p className="font-medium text-gray-900">{booking.expected_duration_hours} hours</p>
            </div>
            {booking.actual_return_time && (
              <div>
                <p className="text-gray-500 mb-1">Returned At</p>
                <p className="font-medium text-gray-900">
                  {new Date(booking.actual_return_time).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${booking.warden_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span className="text-gray-600">Warden {booking.warden_approved ? 'Approved' : 'Pending'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${booking.admin_approved ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span className="text-gray-600">Admin {booking.admin_approved ? 'Approved' : 'Pending'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
