import { useState } from 'react';
import { Search, PenTool, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { clsx } from 'clsx';
import { useService } from '../../context/ServiceContext';

const BikesManagement = () => {
    const { bikes, updateBikeStatus } = useService();
    const [searchQuery, setSearchQuery] = useState('');

    const toggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'maintenance' ? 'available' : 'maintenance';
        // Only allow toggling between maintenance and available for simplicity here
        if (currentStatus === 'in_use' || currentStatus === 'booked') {
            alert("Cannot maintain a bike currently in use or booked.");
            return;
        }
        updateBikeStatus(id, newStatus);
    };

    const filteredBikes = bikes.filter(bike =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.station.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Bike Management</h1>
                <Button>Add New Bike</Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <Input
                        placeholder="Search bikes..."
                        leftIcon={<Search className="w-4 h-4" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Bike Info</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Station</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Battery</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredBikes.map(bike => (
                            <tr key={bike.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{bike.name}</p>
                                    <p className="text-xs text-gray-500">ID: #{bike.id}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{bike.station}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={clsx("h-full rounded-full", bike.batteryLevel > 50 ? "bg-emerald-500" : "bg-red-500")}
                                                style={{ width: `${bike.batteryLevel}%` }}
                                            />
                                        </div>
                                        <span>{bike.batteryLevel}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        label={bike.status}
                                        variant={bike.status === 'available' ? 'success' : bike.status === 'maintenance' ? 'danger' : 'warning'}
                                        className="capitalize"
                                    />
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => toggleStatus(bike.id, bike.status)}
                                        disabled={bike.status === 'in_use' || bike.status === 'booked'}
                                        className={clsx(
                                            "p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                            bike.status === 'maintenance'
                                                ? "text-emerald-600 hover:bg-emerald-50"
                                                : "text-red-600 hover:bg-red-50"
                                        )}
                                        title={bike.status === 'maintenance' ? "Mark Available" : "Mark Maintenance"}
                                    >
                                        {bike.status === 'maintenance' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <PenTool className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BikesManagement;
