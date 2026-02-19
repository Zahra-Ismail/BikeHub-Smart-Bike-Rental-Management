import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

interface CalendarPickerProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
}

const CalendarPicker = ({ selectedDate, onChange }: CalendarPickerProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="font-semibold text-gray-900">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {weekDays.map(day => (
                    <span key={day} className="text-xs font-medium text-gray-400">
                        {day}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day, dayIdx) => {
                    // Add padding for first day
                    const isFirstDay = dayIdx === 0;
                    const colStart = isFirstDay ? day.getDay() + 1 : undefined;

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => onChange(day)}
                            style={{ gridColumnStart: colStart }}
                            className={clsx(
                                'h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors relative',
                                isSameDay(day, selectedDate) && 'bg-emerald-600 text-white font-bold shadow-md',
                                !isSameDay(day, selectedDate) && isToday(day) && 'text-emerald-600 font-bold bg-emerald-50',
                                !isSameDay(day, selectedDate) && !isToday(day) && 'text-gray-700 hover:bg-gray-100',
                            )}
                        >
                            {format(day, 'd')}
                            {isToday(day) && !isSameDay(day, selectedDate) && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarPicker;
