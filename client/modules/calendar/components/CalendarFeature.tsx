import React from 'react'
import { BookingType } from '../type';
import calendarUtils from '../utils';
import { useCalendarBookContext } from '../hooks/useCalendarBookContext';
import { Clock, User } from 'lucide-react';
import { RESOURCES } from '@/modules/book/utils/data';

type CalenderBookProps = {
    bookings: BookingType[];
    refetch: () => void;
    isLoading: boolean;
    error: string;
};

export const CalendarFeature = (props: CalenderBookProps) => {
    const { bookings, refetch, isLoading, error } = props;

    const renderBooking = () => {
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return <CalendarBook bookings={bookings} />;
    };
    return (
        <div>
            {renderBooking()}
        </div>
    )
}

const CalendarBook = (props: { bookings: BookingType[] }) => {
    const { bookings } = props;
    const { currentWeek } = useCalendarBookContext();

    const getBookingsForDay = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return bookings.filter(booking => {
            const bookingDate = new Date(booking.startTime).toISOString().split('T')[0];
            return bookingDate === dateStr;
        });
    };

    const weekDays = calendarUtils.getWeekDays(currentWeek);
    const weekStart = calendarUtils.getWeekStart(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return (
        <div>
            {bookings.length}
            <div className="card p-0 overflow-hidden">
                <div className="grid grid-cols-7 gap-0">
                    {/* Day Headers */}
                    {calendarUtils.constantWeek().map((day, index) => (
                        <div key={day} className="bg-gray-50 p-4 text-center font-medium text-gray-700 border-b border-r border-gray-200">
                            {day}
                        </div>
                    ))}

                    {/* Day Cells */}
                    {weekDays.map((day, index) => {
                        const dayBookings = getBookingsForDay(day);
                        const isToday = day.toDateString() === new Date().toDateString();

                        return (
                            <div
                                key={index}
                                className={`min-h-[200px] p-2 border-r border-b border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'
                                    }`}
                            >
                                <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'
                                    }`}>
                                    {day.getDate()}
                                </div>

                                {/* Bookings */}
                                <div className="space-y-1">
                                    {dayBookings.map(booking => (
                                        <div
                                            key={booking.id}
                                            className={`p-2 rounded border-l-2 text-xs ${calendarUtils.getBookingColor(booking.resource, RESOURCES)
                                                }`}
                                        >
                                            <div className="font-medium truncate">
                                                {booking.resource}
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <Clock className="h-3 w-3" />
                                                <span>
                                                    {calendarUtils.formatTime(booking.startTime)} - {calendarUtils.formatTime(booking.endTime)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <User className="h-3 w-3" />
                                                <span className="truncate">{booking.requestedBy}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

