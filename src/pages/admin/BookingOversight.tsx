import { useState } from 'react';
import { Search, Filter, Calendar, Download } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

const BookingOversight = () => {
    const [bookings] = useState([
        { id: 'BK-7829', user: 'John Doe', bike: 'Thunderbolt X1', date: '2024-03-10', status: 'active', amount: 15.00 },
        { id: 'BK-7830', user: 'Jane Smith', bike: 'City Cruiser', date: '2024-03-09', status: 'completed', amount: 12.50 },
        { id: 'BK-7831', user: 'Mike Ross', bike: 'Speedster Pro', date: '2024-03-09', status: 'cancelled', amount: 0.00 },
        { id: 'BK-7832', user: 'Sarah Lee', bike: 'Eco Move', date: '2024-03-08', status: 'completed', amount: 18.00 },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Oversight</h1>
                    <p className="text-gray-500">Monitor and manage all system bookings.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-center">
                <div className="w-full md:w-64">
                    <Input placeholder="Search booking ID or user..." leftIcon={<Search className="w-4 h-4" />} />
                </div>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Date Range:</span>
                    <select className="border-none text-sm font-medium text-gray-900 focus:ring-0 bg-transparent cursor-pointer">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Custom Range</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <span className="text-sm text-gray-600">Status:</span>
                    <select className="border-none text-sm font-medium text-gray-900 focus:ring-0 bg-transparent cursor-pointer">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Bike Info</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Amount</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">{booking.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{booking.user}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{booking.bike}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                                <td className="px-6 py-4">
                                    <Badge
                                        label={booking.status}
                                        variant={booking.status === 'completed' ? 'success' : booking.status === 'active' ? 'warning' : 'danger'}
                                        className="capitalize"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">${booking.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingOversight;
