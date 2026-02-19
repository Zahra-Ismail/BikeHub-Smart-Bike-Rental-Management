import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import { useService } from '../../context/ServiceContext';
import ActiveBookingCard from '../../components/booking/ActiveBookingCard';

const ActiveBooking = () => {
    const { activeBooking } = useService();

    if (!activeBooking) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                    <h1 className="text-2xl font-bold text-emerald-900 mb-2">No Active Booking</h1>
                    <p className="text-emerald-700 mb-6">You don't have any active rides at the moment.</p>
                    <Link to={ROUTES.BROWSE_BIKES}>
                        <Button>Book a Bike</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Active Ride</h1>
            <ActiveBookingCard booking={{ ...activeBooking, bikeImage: activeBooking.bikeImage || '' }} />
            <div className="flex justify-center">
                <Link to={ROUTES.USER_DASHBOARD}>
                    <Button variant="ghost">Back to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
};

export default ActiveBooking;
