import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const WardenDashboard = () => {
    // Mock Data
    const stats = {
        pendingApprovals: 5,
        activeRides: 12,
        maintenance: 3,
    };

    const schedule = [
        { id: 1, time: '10:00 AM', student: 'John Doe', bike: 'Thunderbolt X1', type: 'Pickup' },
        { id: 2, time: '11:30 AM', student: 'Jane Smith', bike: 'City Cruiser S', type: 'Return' },
        { id: 3, time: '02:00 PM', student: 'Mike Ross', bike: 'Speedster Pro', type: 'Pickup' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Warden Dashboard</h1>
                    <p className="text-gray-500">Overview of today's activities and station status.</p>
                </div>
                <div className="flex gap-2">
                    <Link to={ROUTES.WARDEN_CHECKOUT}>
                        <Button>Process Checkout</Button>
                    </Link>
                    <Link to={ROUTES.WARDEN_RETURN}>
                        <Button variant="outline">Process Return</Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</h3>
                        <Link to={ROUTES.WARDEN_REQUESTS} className="text-xs text-amber-600 font-medium hover:underline">View Requests</Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Rides</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.activeRides}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Under Maintenance</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.maintenance}</h3>
                        <Link to={ROUTES.WARDEN_BIKES} className="text-xs text-red-600 font-medium hover:underline">Manage Bikes</Link>
                    </div>
                </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        Today's Schedule
                    </h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="divide-y divide-gray-100">
                    {schedule.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="text-center w-16">
                                    <span className="block font-bold text-gray-900">{item.time.split(' ')[0]}</span>
                                    <span className="text-xs text-gray-500">{item.time.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.student}</p>
                                    <p className="text-sm text-gray-500">{item.bike}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge
                                    label={item.type}
                                    variant={item.type === 'Pickup' ? 'info' : 'success'}
                                />
                                <Button size="sm" variant="ghost" className="hidden sm:flex" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                    Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WardenDashboard;
