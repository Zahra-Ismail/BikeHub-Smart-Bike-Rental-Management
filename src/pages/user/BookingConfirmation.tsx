import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Bike } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import { clsx } from 'clsx';

const BookingConfirmation = () => {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Booking Data (passed via state/context in real app)
    const bookingDetails = {
        bikeName: 'Thunderbolt X1',
        station: 'Library Station',
        date: new Date(),
        startTime: '10:00',
        endTime: '11:00',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=600'
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setConfirmed(true);
        }, 1500);
    };

    if (confirmed) {
        return (
            <div className="max-w-md mx-auto text-center pt-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
                    <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-8">
                    Your ride is scheduled. You can view details in your dashboard.
                    <br />
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-800 text-sm mt-2 inline-block">ID: #BK-7829</span>
                </p>
                <div className="space-y-3">
                    <Button onClick={() => navigate(ROUTES.ACTIVE_BOOKING)} className="w-full">
                        Go to Active Ride
                    </Button>
                    <Button variant="outline" onClick={() => navigate(ROUTES.USER_DASHBOARD)} className="w-full">
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Booking</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Summary Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="aspect-video bg-gray-100">
                        <img
                            src={bookingDetails.image}
                            alt={bookingDetails.bikeName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-gray-900">{bookingDetails.bikeName}</h3>
                            <span className="font-bold text-emerald-600">${bookingDetails.price.toFixed(2)}</span>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span>{bookingDetails.date.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span>{bookingDetails.startTime} - {bookingDetails.endTime}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span>{bookingDetails.station}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms & Actions */}
                <div className="flex flex-col justify-between">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Bike className="w-5 h-5" />
                            Rental Terms
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                            <li>I agree to return the bike to a designated station.</li>
                            <li>I accept responsibility for any damage during my ride.</li>
                            <li>Overtime charges apply if returned late ($5/hr).</li>
                            <li>I will wear a helmet (if required by local law).</li>
                        </ul>

                        <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 checked:bg-emerald-600 checked:border-transparent"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <CheckCircle className="pointer-events-none absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100" />
                            </div>
                            <span className={clsx("text-sm transition-colors", agreed ? "text-gray-900 font-medium" : "text-gray-500 group-hover:text-gray-700")}>
                                I have read and agree to the Terms & Conditions
                            </span>
                        </label>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleConfirm}
                            className="w-full"
                            size="lg"
                            disabled={!agreed}
                            isLoading={isLoading}
                        >
                            Confirm Booking
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
