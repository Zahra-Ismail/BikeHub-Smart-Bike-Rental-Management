import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AvailabilityCounters from '../../components/booking/AvailabilityCounters';
import ActiveBookingCard from '../../components/booking/ActiveBookingCard';
import NotificationsPanel from '../../components/common/NotificationsPanel';
import { useService } from '../../context/ServiceContext';

// Mock Data
const MOCK_STATS = {
    available: 42,
    inUse: 18,
    maintenance: 3,
};

const ACTIVE_BOOKING = {
    id: '123',
    bikeName: 'Thunderbolt X1',
    bikeImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=600',
    endTime: new Date(Date.now() + 1000 * 60 * 45), // 45 mins remaining
    returnLocation: 'Library Station',
};

const UserDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            {/* Welcome Card - Gradient Style */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Hello, John! 👋</h1>
                        <p className="text-emerald-50 opacity-90 text-lg">Ready for a sustainable ride across campus?</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <p className="text-emerald-50 text-xs font-medium uppercase tracking-wider mb-1">Student ID</p>
                        <p className="text-2xl font-mono font-bold">2024001</p>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/5 rounded-full blur-2xl"></div>
            </div>

            {/* Counters */}
            <AvailabilityCounters {...MOCK_STATS} />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Booking */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Active Booking</h2>
                        {ACTIVE_BOOKING ? (
                            <ActiveBookingCard booking={ACTIVE_BOOKING} />
                        ) : (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center">
                                <p className="text-emerald-800 font-medium mb-2">No active rides currently</p>
                                <p className="text-emerald-600 text-sm mb-4">Ready to go? Find a bike nearby.</p>
                                <Link to={ROUTES.BROWSE_BIKES}>
                                    <Button>Book a Bike Now</Button>
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Quick Book */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Book</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search station or bike name..."
                                    leftIcon={<Search className="w-5 h-5" />}
                                />
                            </div>
                            <Link to={ROUTES.BROWSE_BIKES}>
                                <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                                    Find Bikes
                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <NotificationsPanel />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
