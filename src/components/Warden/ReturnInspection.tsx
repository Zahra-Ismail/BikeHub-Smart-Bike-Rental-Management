import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Booking, Profile, Bike } from '../../lib/database.types';
import { CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';

interface ReturnInspectionProps {
  bookings: (Booking & { user: Profile; bike: Bike })[];
  onUpdate: () => void;
}

export default function ReturnInspection({ bookings, onUpdate }: ReturnInspectionProps) {
  const { profile } = useAuth();
  const [processing, setProcessing] = useState<string | null>(null);
  const [damageModalOpen, setDamageModalOpen] = useState<string | null>(null);
  const [damageDescription, setDamageDescription] = useState('');
  const [damageCharge, setDamageCharge] = useState(0);

  const handleConfirmReturn = async (booking: Booking & { bike: Bike }) => {
    setProcessing(booking.id);
    try {
      const now = new Date();
      const endTime = new Date(booking.end_time);
      const overtimeHours = Math.max(0, Math.ceil((now.getTime() - endTime.getTime()) / (1000 * 60 * 60)));
      const overtimeCharge = overtimeHours * 15;

      const totalCost = booking.total_cost + overtimeCharge + booking.damage_charge;

      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          status: 'returned',
          actual_return_time: now.toISOString(),
          overtime_charge: overtimeCharge,
          total_cost: totalCost,
        })
        .eq('id', booking.id);

      if (bookingError) throw bookingError;

      const { error: bikeError } = await supabase
        .from('bikes')
        .update({ status: 'available' })
        .eq('id', booking.bike_id);

      if (bikeError) throw bikeError;

      const { error: receiptError } = await supabase
        .from('receipts')
        .insert({
          booking_id: booking.id,
          user_id: booking.user_id,
          base_cost: booking.total_cost,
          overtime_charge: overtimeCharge,
          damage_charge: booking.damage_charge,
          total_amount: totalCost,
        });

      if (receiptError) throw receiptError;

      onUpdate();
    } catch (error) {
      console.error('Error confirming return:', error);
      alert('Failed to confirm return');
    } finally {
      setProcessing(null);
    }
  };

  const handleReportDamage = async (bookingId: string) => {
    if (!profile?.id) return;

    setProcessing(bookingId);
    try {
      const { error: damageError } = await supabase
        .from('damage_reports')
        .insert({
          booking_id: bookingId,
          warden_id: profile.id,
          description: damageDescription,
          charge_amount: damageCharge,
        });

      if (damageError) throw damageError;

      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          damage_charge: damageCharge,
        })
        .eq('id', bookingId);

      if (bookingError) throw bookingError;

      setDamageModalOpen(null);
      setDamageDescription('');
      setDamageCharge(0);
      onUpdate();
    } catch (error) {
      console.error('Error reporting damage:', error);
      alert('Failed to report damage');
    } finally {
      setProcessing(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No active rentals to inspect</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const now = new Date();
          const endTime = new Date(booking.end_time);
          const isOvertime = now > endTime;
          const overtimeHours = Math.max(0, Math.ceil((now.getTime() - endTime.getTime()) / (1000 * 60 * 60)));
          const overtimeCharge = overtimeHours * 15;

          return (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.bike.name}</h3>
                  <p className="text-gray-600">Rented by: {booking.user.full_name}</p>
                  <p className="text-sm text-gray-500">{booking.user.email}</p>
                </div>
                <div className="text-right">
                  {isOvertime && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-2">
                      OVERTIME
                    </span>
                  )}
                  <p className="text-2xl font-bold text-gray-900">
                    ${booking.total_cost + overtimeCharge + booking.damage_charge}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Expected Return</p>
                  <p className="font-medium text-gray-900">{new Date(booking.end_time).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Duration</p>
                  <p className="font-medium text-gray-900">{booking.expected_duration_hours} hours</p>
                </div>
                {isOvertime && (
                  <>
                    <div>
                      <p className="text-red-600 mb-1">Overtime</p>
                      <p className="font-medium text-red-600">{overtimeHours} hours</p>
                    </div>
                    <div>
                      <p className="text-red-600 mb-1">Overtime Charge</p>
                      <p className="font-medium text-red-600">${overtimeCharge}</p>
                    </div>
                  </>
                )}
                {booking.damage_charge > 0 && (
                  <div className="col-span-2">
                    <p className="text-red-600 mb-1">Damage Charge</p>
                    <p className="font-medium text-red-600">${booking.damage_charge}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setDamageModalOpen(booking.id)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Report Damage</span>
                </button>
                <button
                  onClick={() => handleConfirmReturn(booking)}
                  disabled={processing === booking.id}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Return</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {damageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Damage</h2>

            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Damage Description</span>
                </label>
                <textarea
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe the damage..."
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Charge Amount</span>
                </label>
                <input
                  type="number"
                  value={damageCharge}
                  onChange={(e) => setDamageCharge(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setDamageModalOpen(null);
                    setDamageDescription('');
                    setDamageCharge(0);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReportDamage(damageModalOpen)}
                  disabled={processing === damageModalOpen}
                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
