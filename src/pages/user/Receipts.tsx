import { useRef } from 'react';
import { Download, Share2 } from 'lucide-react';
import Button from '../../components/common/Button';
import { APP_NAME } from '../../config/constants';

const Receipt = () => {
    // Mock Booking Data
    const booking = {
        id: 'BK-7829',
        date: new Date('2024-03-10T11:00:00'),
        bike: 'Thunderbolt X1',
        studentName: 'John Doe',
        studentId: '2024001',
        duration: '1h 00m',
        rate: 15.00,
        subtotal: 15.00,
        tax: 1.50,
        total: 16.50,
        paymentMethod: 'Student Wallet'
    };

    const receiptRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        // In a real app, use html2canvas or similar to generate PDF
        alert('Downloading PDF...');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Receipt Details</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert('Shared!')}>
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={handleDownload} leftIcon={<Download className="w-4 h-4" />}>
                        Download PDF
                    </Button>
                </div>
            </div>

            <div ref={receiptRef} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="text-center mb-8 border-b border-gray-100 pb-8">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-xl mb-4">
                        B
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{APP_NAME}</h2>
                    <p className="text-gray-500">University Campus Transport</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Billed To</p>
                        <p className="font-bold text-gray-900">{booking.studentName}</p>
                        <p className="text-sm text-gray-600">ID: {booking.studentId}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Receipt Number</p>
                        <p className="font-bold text-gray-900">#{booking.id}</p>
                        <p className="text-sm text-gray-600">{booking.date.toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-3">Trip Details</p>
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-900">{booking.bike}</p>
                            <p className="text-sm text-gray-500">Duration: {booking.duration}</p>
                        </div>
                        <p className="font-bold text-gray-900">${booking.rate.toFixed(2)}/hr</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>${booking.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tax (10%)</span>
                        <span>${booking.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                        <span>Total Paid</span>
                        <span>${booking.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Paid via {booking.paymentMethod} • Thank you for riding with us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
