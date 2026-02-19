import { useState } from 'react';
import { Camera, AlertCircle, Calculator } from 'lucide-react';
import Button from '../../components/common/Button';

const ReturnInspection = () => {
    const [damageType, setDamageType] = useState('none');
    const [additionalCharges, setAdditionalCharges] = useState(0);

    const damages = [
        { value: 'none', label: 'No Damage', cost: 0 },
        { value: 'scratch', label: 'Paint Scratch', cost: 15 },
        { value: 'tire', label: 'Flat Tire', cost: 25 },
        { value: 'chain', label: 'Broken Chain', cost: 30 },
        { value: 'other', label: 'Other (Specify)', cost: 0 },
    ];

    const handleDamageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setDamageType(type);
        const damage = damages.find(d => d.value === type);
        if (damage && damage.cost > 0) {
            setAdditionalCharges(damage.cost);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Return Inspection</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="font-bold text-gray-900">Booking #BK-7829</h2>
                        <p className="text-sm text-gray-500">Thunderbolt X1 • John Doe</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        Return Processing
                    </span>
                </div>

                {/* Photo Comparison */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Pre-Ride Photo</p>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=600" alt="Pre-ride" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Current Condition</p>
                        <button className="w-full h-full aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                            <Camera className="w-8 h-8 mb-2" />
                            <span>Take Photo</span>
                        </button>
                    </div>
                </div>

                {/* Damage Assessment */}
                <div className="border-t border-gray-100 pt-6 space-y-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Damage Assessment
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Damage Type</label>
                            <select
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                value={damageType}
                                onChange={handleDamageChange}
                            >
                                {damages.map(d => (
                                    <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Penalty Charge ($)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    className="pl-7 w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    value={additionalCharges}
                                    onChange={(e) => setAdditionalCharges(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Calculator className="w-5 h-5 text-gray-500" />
                            <span className="font-medium text-gray-700">Total Charges</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">${(15 + additionalCharges).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <Button variant="outline">Flag for Review</Button>
                    <Button>Confirm Return & Charge</Button>
                </div>
            </div>
        </div>
    );
};

export default ReturnInspection;
