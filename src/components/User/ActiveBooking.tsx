import { useState, useEffect } from 'react';
import type { Booking } from '../../lib/database.types';
import { Clock, AlertTriangle, DollarSign } from 'lucide-react';

interface ActiveBookingProps {
  booking: Booking;
  onUpdate: () => void;
}

export default function ActiveBooking({ booking }: ActiveBookingProps) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isOvertime, setIsOvertime] = useState(false);
  const [overtimeMinutes, setOvertimeMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endTime = new Date(booking.end_time);
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsOvertime(true);
        const overtimeDiff = Math.abs(diff);
        const minutes = Math.floor(overtimeDiff / 1000 / 60);
        setOvertimeMinutes(minutes);

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        setTimeRemaining(`${hours}h ${mins}m overtime`);
      } else {
        setIsOvertime(false);
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [booking.end_time]);

  const getBikeFromBooking = async () => {
    return null;
  };

  useEffect(() => {
    getBikeFromBooking();
  }, [booking.bike_id]);

  const overtimeCharge = Math.ceil(overtimeMinutes / 60) * 15;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className={`p-6 ${isOvertime ? 'bg-red-50' : 'bg-blue-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Active Rental</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              isOvertime ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {isOvertime ? 'OVERTIME' : 'ACTIVE'}
            </span>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <div className="flex items-center justify-center mb-4">
              <Clock className={`w-16 h-16 ${isOvertime ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {isOvertime ? 'Time Over Expected Return' : 'Time Remaining'}
              </p>
              <p className={`text-4xl font-bold ${isOvertime ? 'text-red-600' : 'text-blue-600'}`}>
                {timeRemaining}
              </p>
            </div>
          </div>

          {isOvertime && (
            <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 mb-1">Overtime Charges Apply</p>
                  <p className="text-sm text-red-700">
                    You are being charged $15 per hour for overtime. Current overtime charge: ${overtimeCharge}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Time</span>
                <span className="font-medium text-gray-900">
                  {new Date(booking.start_time).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected End Time</span>
                <span className="font-medium text-gray-900">
                  {new Date(booking.end_time).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">{booking.expected_duration_hours} hours</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cost Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Cost</span>
                <span className="font-medium text-gray-900">${booking.total_cost}</span>
              </div>
              {isOvertime && (
                <div className="flex justify-between">
                  <span className="text-red-600">Overtime Charges</span>
                  <span className="font-medium text-red-600">${overtimeCharge}</span>
                </div>
              )}
              {booking.damage_charge > 0 && (
                <div className="flex justify-between">
                  <span className="text-red-600">Damage Charges</span>
                  <span className="font-medium text-red-600">${booking.damage_charge}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold text-gray-900">Current Total</span>
                <span className="text-xl font-bold text-blue-600">
                  ${booking.total_cost + overtimeCharge + booking.damage_charge}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-900 mb-1">Return Reminder</p>
                <p className="text-sm text-blue-700">
                  Please return the bike to the warden for inspection. The warden will confirm the return and check for any damages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
