import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

// Mock Data
const BOOKINGS = [
    { id: 'BK-7829', bike: 'Thunderbolt X1', date: new Date('2024-03-10T10:00:00'), duration: '1h 00m', status: 'completed', charges: 15.00 },
    { id: 'BK-7830', bike: 'City Cruiser S', date: new Date('2024-03-08T14:30:00'), duration: '45m', status: 'completed', charges: 12.00 },
    { id: 'BK-7831', bike: 'Speedster Pro', date: new Date('2024-03-05T09:00:00'), duration: '-', status: 'cancelled', charges: 0.00 },
    { id: 'BK-7832', bike: 'Eco Move', date: new Date('2024-03-01T16:00:00'), duration: '2h 15m', status: 'completed', charges: 25.50 },
];

const BookingHistory = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredBookings = BOOKINGS.filter(booking => {
        const matchesFilter = filter === 'all' || booking.status === filter;
        const matchesSearch = booking.bike.toLowerCase().includes(search.toLowerCase()) || booking.id.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'active': return 'warning';
            case 'cancelled': return 'danger';
            default: return 'neutral';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ride History</h1>
                    <p className="text-gray-500">View and manage your past trips.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export CSV</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex gap-2">
                        {['all', 'completed', 'active', 'cancelled'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-64">
                        <Input
                            placeholder="Search booking ID or bike..."
                            leftIcon={<Search className="w-4 h-4" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bike</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Charges</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.bike}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {format(booking.date, 'MMM d, yyyy')}
                                        <span className="block text-xs text-gray-400">{format(booking.date, 'h:mm a')}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.duration}</td>
                                    <td className="px-6 py-4">
                                        {/* @ts-ignore */}
                                        <Badge label={booking.status} variant={getStatusVariant(booking.status)} className="capitalize" />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${booking.charges.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right">
                                        {booking.status === 'completed' && (
                                            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">Receipt</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No bookings found matching filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingHistory;
