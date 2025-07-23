"use client";

import React from "react";
import { CalendarBookProvider } from "./CalendarProvider";
import { useFetchCalendarBook } from "./hooks/useFetchCalendarBook";
import { CalendarFeature } from "./components/CalendarFeature";
import { useCalendarBookContext } from "./hooks/useCalendarBookContext";
import { CalendarControl } from "./components/CalendarControl";

export const CalendarManage = () => {
  return (
    <CalendarBookProvider>
      <CalenderContent />
    </CalendarBookProvider>
  );
};

const CalenderContent = () => {
  const { loading, refetch, error } = useFetchCalendarBook();
  const { bookings } = useCalendarBookContext();
  return (
    <div>
      <div className="card text-center mb-4">Resource Booking Calendar.</div>

      <CalendarControl />

      <CalendarFeature
        bookings={bookings}
        isLoading={loading}
        refetch={refetch}
        error={error!}
      />
    </div>
  );
};
