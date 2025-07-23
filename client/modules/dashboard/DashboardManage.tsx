"use client";

import React from "react";
import { BookingProvider } from "./BookingProvider";
import { useFetchBooking } from "./hooks/useFetchBooking";
import { useBookingContext } from "./hooks/useBookingContext";
import { BookingTable } from "./components/BookingTable";
import Link from "next/link";

export const DashboardManage = () => {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
};

const BookingContent = () => {
  const { isLoading, error, refetch } = useFetchBooking();
  const { bookings } = useBookingContext();
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Booking Dashboard</h1>
        <Link href="/book" className="btn-primary">
          New Booking
        </Link>
      </div>
      <BookingTable
        bookings={bookings}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};
