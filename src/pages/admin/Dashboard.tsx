import { Users, Bike, TrendingUp, DollarSign, Download } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
                    <p className="text-gray-500">System-wide statistics and performance metrics.</p>
                </div>
                <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export Report</Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-green-600">+12%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">2,543</h3>
                    <p className="text-sm text-gray-500">Total Users</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Bike className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-green-600">+5%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">1,205</h3>
                    <p className="text-sm text-gray-500">Total Rides</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-green-600">+18%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">85%</h3>
                    <p className="text-sm text-gray-500">Utilization Rate</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-red-600">-2%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">$4,350</h3>
                    <p className="text-sm text-gray-500">Revenue (Penalties)</p>
                </div>
            </div>

            {/* Charts Section Placeholder */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80 flex items-center justify-center">
                    <p className="text-gray-400">Bookings Per Day Chart Placeholder</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80 flex items-center justify-center">
                    <p className="text-gray-400">Most Used Bikes Chart Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
