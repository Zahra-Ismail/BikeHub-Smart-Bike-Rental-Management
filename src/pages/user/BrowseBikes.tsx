import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import BikeCard from '../../components/bikes/BikeCard';
import Modal from '../../components/common/Modal';
import BookingSummary from '../../components/booking/BookingSummary';

import { useService } from '../../context/ServiceContext';

const BrowseBikes = () => {
    const { bikes, bookBike } = useService();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBike, setSelectedBike] = useState<any | null>(null);

    const filteredBikes = bikes.filter(bike =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBook = (bikeId: string) => {
        const bike = bikes.find(b => b.id === bikeId);
        if (bike) {
            setSelectedBike(bike);
        }
    };

    const confirmBooking = async () => {
        if (selectedBike) {
            const success = await bookBike(selectedBike.id, new Date(), 1);
            if (success) {
                // In a real app we might show a toast here
            }
            setSelectedBike(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Browse Bikes</h1>
                    <p className="text-gray-500">Find the perfect ride for your needs.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex-1 md:w-64">
                        <Input
                            placeholder="Search bikes..."
                            leftIcon={<Search className="w-5 h-5" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="px-3">
                        <SlidersHorizontal className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBikes.map(bike => (
                    <BikeCard
                        key={bike.id}
                        bike={bike}
                        onBook={handleBook}
                    />
                ))}
            </div>

            {filteredBikes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No bikes found matching your search.</p>
                </div>
            )}

            {/* Booking Modal */}
            <Modal
                isOpen={!!selectedBike}
                onClose={() => setSelectedBike(null)}
                title="Confirm Booking"
            >
                {selectedBike && (
                    <div className="space-y-6">
                        <BookingSummary
                            bike={selectedBike}
                            startTime={new Date()}
                            endTime={new Date(Date.now() + 3600000)} // +1 hour
                            totalPrice={selectedBike.pricePerHour}
                        />

                        <div className="space-y-3">
                            <Button
                                onClick={confirmBooking}
                                className="w-full"
                                size="lg"
                            >
                                Confirm Payment & Book
                            </Button>
                            <Button
                                onClick={() => setSelectedBike(null)}
                                variant="ghost"
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BrowseBikes;
