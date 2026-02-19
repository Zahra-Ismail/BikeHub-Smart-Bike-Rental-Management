import { useState } from 'react';
import { QrCode, ClipboardCheck, Camera, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const CheckOut = () => {
    const [step, setStep] = useState(1);
    const [bookingId, setBookingId] = useState('');

    const renderStep1 = () => (
        <div className="text-center max-w-md mx-auto space-y-6">
            <div className="bg-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <QrCode className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">Scan Student QR Code</p>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or manually enter</span>
                </div>
            </div>
            <div className="space-y-3">
                <Input
                    placeholder="Enter Booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                />
                <Button className="w-full" onClick={() => setStep(2)}>Verify Booking</Button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <p className="font-bold text-blue-900">John Doe (Student)</p>
                    <p className="text-sm text-blue-700">Bike: Thunderbolt X1</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-blue-700">Booking ID</p>
                    <p className="font-bold text-blue-900">#BK-7829</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5" />
                    Pre-Ride Inspection
                </h3>
                <div className="space-y-3">
                    {['Brakes functionality check', 'Tires pressure check', 'Battery level > 80%', 'Lights functionality'].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                            <span className="text-gray-700">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5" />
                    Bike Condition
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <button className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-xs">Take Photo</span>
                    </button>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        No photo
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Confirm Checkout</Button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="text-center max-w-md mx-auto py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Checkout Complete</h2>
            <p className="text-gray-500 mb-8">Role verified and bike handover recorded.</p>
            <Button onClick={() => { setStep(1); setBookingId(''); }}>Process Next</Button>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Bike Checkout Process</h1>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
};

export default CheckOut;
