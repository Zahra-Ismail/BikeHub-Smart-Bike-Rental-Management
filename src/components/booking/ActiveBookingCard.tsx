import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { useTimer } from '../../hooks/useTimer';
import { ROUTES } from '../../config/constants';
import { format } from 'date-fns';

interface ActiveBookingCardProps {
    booking: {
        id: string;
        bikeName: string;
        bikeImage: string;
        endTime: Date;
        returnLocation: string;
    };
}

const ActiveBookingCard = ({ booking }: ActiveBookingCardProps) => {
    const navigate = useNavigate();
    const { timeLeft, isExpired: _isExpired } = useTimer(booking.endTime);

    // @ts-ignore
    const { hours = 0, minutes = 0, seconds = 0 } = timeLeft.timeLeft || {};

    return (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden mb-8">
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Bike Image */}
                    <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={booking.bikeImage}
                            alt={booking.bikeName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1 w-full">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{booking.bikeName}</h3>
                                <div className="flex items-center gap-2 text-gray-500 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">Return to: {booking.returnLocation}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    Active Ride
                                </span>
                            </div>
                        </div>

                        {/* Timer - Large Circular Style */}
                        <div className="flex justify-center py-6">
                            <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-8 border-emerald-100 bg-white shadow-inner">
                                <div className="text-center">
                                    <Clock className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-3xl font-mono font-bold text-gray-900 tracking-wider">
                                        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium uppercase mt-1">Time Remaining</p>
                                </div>
                                {/* Progress Indicator (Visual only for now) */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none stroke-emerald-500" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="none" strokeWidth="4" strokeDasharray="289" strokeDashoffset="50" className="opacity-20" />
                                    <circle cx="50" cy="50" r="46" fill="none" strokeWidth="4" strokeDasharray="289" strokeDashoffset="100" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500 mb-6 px-4">
                            <span>Due Time</span>
                            <span className="font-bold text-gray-900">{format(booking.endTime, 'hh:mm a')}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                onClick={() => navigate(ROUTES.ACTIVE_BOOKING)}
                                className="flex-1"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                View Details & Return
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Extend Booking
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveBookingCard;
