import { clsx } from 'clsx';

interface TimeSlotPickerProps {
    selectedTime: string | null;
    onChange: (time: string) => void;
}

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
];

const TimeSlotPicker = ({ selectedTime, onChange }: TimeSlotPickerProps) => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((time) => (
                <button
                    key={time}
                    onClick={() => onChange(time)}
                    className={clsx(
                        'py-2 px-3 text-sm rounded-lg border transition-all',
                        selectedTime === time
                            ? 'bg-emerald-600 border-emerald-600 text-white font-medium shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
                    )}
                >
                    {time}
                </button>
            ))}
        </div>
    );
};

export default TimeSlotPicker;
