import { Bike as BikeIcon, Battery, Clock } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export interface BikeType {
    id: string;
    name: string;
    model: string;
    status: 'available' | 'booked' | 'maintenance' | 'in_use';
    batteryLevel: number;
    imageUrl?: string;
    pricePerHour: number;
}

interface BikeCardProps {
    bike: BikeType;
    onBook: (bikeId: string) => void;
}

const BikeCard = ({ bike, onBook }: BikeCardProps) => {
    const statusColors = {
        available: 'success',
        booked: 'warning',
        maintenance: 'default', // Gray for maintenance
        in_use: 'danger',      // Red for In Use
    } as any;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 relative group">
                {bike.imageUrl ? (
                    <img
                        src={bike.imageUrl}
                        alt={bike.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <BikeIcon className="w-12 h-12" />
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge
                        label={bike.status}
                        variant={statusColors[bike.status]}
                        className="capitalize"
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-semibold text-gray-900">{bike.name}</h3>
                        <p className="text-sm text-gray-500">{bike.model}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-blue-600">${bike.pricePerHour}</p>
                        <p className="text-xs text-gray-500">per hour</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <Battery className="w-4 h-4" />
                        <span>{bike.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Elec.</span>
                    </div>
                </div>

                <button
                    onClick={() => onBook(bike.id)}
                    disabled={bike.status !== 'available'}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {bike.status === 'available' ? 'Book Now' : 'Unavailable'}
                </button>
            </div>
        </div>
    );
};

export default BikeCard;
