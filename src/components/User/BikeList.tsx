import { useState } from 'react';
import type { Bike } from '../../lib/database.types';
import BookingModal from './BookingModal';
import { Bike as BikeIcon } from 'lucide-react';

interface BikeListProps {
  bikes: Bike[];
  onBookingComplete: () => void;
}

export default function BikeList({ bikes, onBookingComplete }: BikeListProps) {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BikeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bikes available at the moment</p>
          </div>
        ) : (
          bikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {bike.image_url ? (
                  <img src={bike.image_url} alt={bike.name} className="w-full h-full object-cover" />
                ) : (
                  <BikeIcon className="w-20 h-20 text-white" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{bike.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bike.description || 'Great bike for riding'}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">${bike.price_per_hour}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                  <button
                    onClick={() => setSelectedBike(bike)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedBike && (
        <BookingModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onComplete={() => {
            setSelectedBike(null);
            onBookingComplete();
          }}
        />
      )}
    </>
  );
}
