import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const BookingRequests = () => {
    const [requests, setRequests] = useState([
        { id: 1, student: 'Alice Johnson', studentId: '2024045', bike: 'Thunderbolt X1', time: '10:00 AM - 12:00 PM', purpose: 'Campus transport' },
        { id: 2, student: 'Bob Smith', studentId: '2024032', bike: 'City Cruiser', time: '01:00 PM - 02:00 PM', purpose: 'Errands' },
    ]);
    const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState('');

    const handleApprove = (id: number) => {
        setRequests(prev => prev.filter(req => req.id !== id));
        alert('Booking Approved!');
    };

    const handleReject = () => {
        if (selectedRequest) {
            setRequests(prev => prev.filter(req => req.id !== selectedRequest));
            setSelectedRequest(null);
            setRejectReason('');
            alert('Booking Rejected.');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
                <p className="text-gray-500">Manage incoming booking requests from students.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {requests.map(req => (
                    <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900">{req.student}</h3>
                                <p className="text-sm text-gray-500">ID: {req.studentId}</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                Pending
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Bike Requested</span>
                                <span className="font-medium">{req.bike}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Time Slot</span>
                                <span className="font-medium">{req.time}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => handleApprove(req.id)}
                                className="flex-1"
                                leftIcon={<Check className="w-4 h-4" />}
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={() => setSelectedRequest(req.id)}
                                variant="outline"
                                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                leftIcon={<X className="w-4 h-4" />}
                            >
                                Reject
                            </Button>
                        </div>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="col-span-full p-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        No pending booking requests.
                    </div>
                )}
            </div>

            <Modal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                title="Reject Booking Request"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">Please provide a reason for rejecting this booking.</p>
                    <Input
                        placeholder="Reason (e.g., Bike maintenance, User flagged)"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" onClick={() => setSelectedRequest(null)}>Cancel</Button>
                        <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700">Confirm Reject</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BookingRequests;
