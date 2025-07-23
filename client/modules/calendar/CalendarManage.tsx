'use client'

import React from 'react'
import { CalendarBookProvider } from './CalendarProvider'
import { useFetchCalendarBook } from './hooks/useFetchCalendarBook'
import { CalendarFeature } from './components/CalendarFeature'
import { useCalendarBookContext } from './hooks/useCalendarBookContext'

export const CalendarManage = () => {
    return (
        <CalendarBookProvider>
            <CalenderContent />
        </CalendarBookProvider>
    )
}

const CalenderContent = () => {
    const { loading, refetch, error } = useFetchCalendarBook();
    const { bookings } = useCalendarBookContext()
    return (
        <div>
            <CalendarFeature bookings={bookings} isLoading={loading} refetch={refetch} error={error!} />
        </div>
    )
}
