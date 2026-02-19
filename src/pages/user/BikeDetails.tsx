import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Info, Shield, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import CalendarPicker from '../../components/booking/CalendarPicker';
import TimeSlotPicker from '../../components/booking/TimeSlotPicker';
import { useService } from '../../context/ServiceContext';

const BikeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bikes, bookBike } = useService();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const bike = bikes.find(b => b.id === id);

    if (!bike) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Bike not found.</p>
                <Link to={ROUTES.BROWSE_BIKES}>
                    <Button variant="outline" className="mt-4">Back to Browse</Button>
                </Link>
            </div>
        );
    }

    const handleConfirmBooking = async () => {
        if (selectedTime) {
            // Calculate start time based on selectedDate and selectedTime
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const startTime = new Date(selectedDate);
            startTime.setHours(hours, minutes, 0, 0);

            const success = await bookBike(bike.id, startTime, 1); // 1 hour duration
            if (success) {
                navigate(ROUTES.USER_DASHBOARD); // Redirect to dashboard to see active booking
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <Link to={ROUTES.BROWSE_BIKES} className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Browse
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Image & Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={bike.imageUrl}
                            alt={bike.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{bike.name}</h1>
                                <p className="text-lg text-gray-500 mt-1">{bike.model}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-emerald-600">${bike.pricePerHour}</p>
                                <p className="text-gray-500">per hour</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <MapPin className="w-5 h-5 text-emerald-600" />
                                <span>{bike.station}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Info className="w-5 h-5 text-blue-600" />
                                <span>Condition: <span className="font-medium text-gray-900">{bike.condition || 'Good'}</span></span>
                            </div>
                            <Badge label={bike.status} variant={bike.status === 'available' ? 'success' : 'warning'} />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Usage Rules</h3>
                            <ul className="space-y-2">
                                {(bike.rules || ['Helmet required.', 'Return to station.']).map((rule, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                                        <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {bike.description || 'No description available.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Book this Ride</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4" />
                                    Select Date
                                </label>
                                <CalendarPicker selectedDate={selectedDate} onChange={setSelectedDate} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Select Time Slot
                                </label>
                                <TimeSlotPicker selectedTime={selectedTime} onChange={setSelectedTime} />

                                {/* Availability Indicator */}
                                <div className="mt-3 flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-gray-600">Available at {bike.station}</span>
                                </div>
                            </div>

                            {/* Conflict Warning - Simulated */}
                            {selectedTime === '10:00' && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-red-700 text-sm animate-pulse">
                                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                    <p>High demand! This time slot is filling up fast. Book within 5 mins to secure.</p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Total Price (1 hr)</span>
                                    <span className="font-bold text-xl text-gray-900">${bike.pricePerHour.toFixed(2)}</span>
                                </div>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={!selectedTime || bike.status !== 'available'}
                                    onClick={handleConfirmBooking}
                                >
                                    Proceed to Confirm
                                </Button>
                                {(!selectedTime) && (
                                    <p className="text-xs text-center text-gray-500 mt-2">Please select a time slot to continue</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetails;
