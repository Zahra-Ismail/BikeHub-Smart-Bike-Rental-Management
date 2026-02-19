import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { BikeType } from '../bikes/BikeCard';

interface BookingSummaryProps {
    bike: BikeType;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
}

const BookingSummary = ({ bike, startTime, endTime, totalPrice }: BookingSummaryProps) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Booking Summary</h3>

            <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <p className="font-medium text-gray-900">{bike.name}</p>
                        <p className="text-gray-500">{bike.model}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{format(startTime, 'MMM dd, yyyy')}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                        {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Main Campus Station</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold text-gray-900">
                <span>Total</span>
                <span className="text-lg">${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default BookingSummary;
