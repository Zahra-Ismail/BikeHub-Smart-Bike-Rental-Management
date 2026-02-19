import { Bike, AlertTriangle, CheckCircle } from 'lucide-react';

interface AvailabilityCountersProps {
    available: number;
    inUse: number;
    maintenance: number;
}

const AvailabilityCounters = ({ available, inUse, maintenance }: AvailabilityCountersProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Available Bikes</p>
                    <h3 className="text-2xl font-bold text-gray-900">{available}</h3>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Bike className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">In Use</p>
                    <h3 className="text-2xl font-bold text-gray-900">{inUse}</h3>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Maintenance</p>
                    <h3 className="text-2xl font-bold text-gray-900">{maintenance}</h3>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityCounters;
