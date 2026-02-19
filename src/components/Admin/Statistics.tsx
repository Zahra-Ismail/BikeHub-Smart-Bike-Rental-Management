import type { Booking, Bike, Profile } from '../../lib/database.types';
import { DollarSign, TrendingUp, Users, Bike as BikeIcon } from 'lucide-react';

interface StatisticsProps {
  bookings: (Booking & { user: Profile; bike: Bike })[];
  bikes: Bike[];
}

export default function Statistics({ bookings, bikes }: StatisticsProps) {
  const totalRevenue = bookings
    .filter(b => b.status === 'returned')
    .reduce((sum, b) => sum + b.total_cost + b.overtime_charge + b.damage_charge, 0);

  const activeRentals = bookings.filter(b => b.status === 'active').length;
  const pendingApprovals = bookings.filter(b => b.status === 'pending').length;
  const availableBikes = bikes.filter(b => b.status === 'available').length;

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      name: 'Active Rentals',
      value: activeRentals.toString(),
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Approvals',
      value: pendingApprovals.toString(),
      icon: Users,
      color: 'bg-yellow-500',
    },
    {
      name: 'Available Bikes',
      value: availableBikes.toString(),
      icon: BikeIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{booking.user.full_name}</p>
                <p className="text-sm text-gray-600">{booking.bike.name}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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
          ))}
        </div>
      </div>
    </div>
  );
}
