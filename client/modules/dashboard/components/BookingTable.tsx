"use client";

import React from "react";
import { BookingType } from "../type";
import { Clock, User } from "lucide-react";
import { formatDateTime, getBookingStatus, getStatusBadge } from "../utils";
import { DeleteAction } from "./actions/DeleteAction";

type BookingTableProps = {
  bookings: BookingType[];
  refetch: () => void;
  isLoading: boolean;
  error: string;
};

export const BookingTable = (props: BookingTableProps) => {
  const { bookings, refetch, isLoading, error } = props;

  const renderBooking = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <Bookings bookings={bookings} refetch={refetch} />;
  };
  return (
    <>
      <div>{renderBooking()}</div>
    </>
  );
};

const Bookings = ({ bookings,refetch }: { bookings: BookingType[]; refetch: ()=>void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookings?.map((booking) => {
        const status = getBookingStatus(booking.startTime, booking.endTime);
        return (
          <div key={booking.id} className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {booking.resource}
            </h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg ">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {formatDateTime(booking.startTime)} -{" "}
                    {formatDateTime(booking.endTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={getStatusBadge(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {booking.requestedBy}
                  </span>
                </div>
              </div>
             <DeleteAction id={booking.id} mutate={refetch} /> 
            </div>
          </div>
        );
      })}
    </div>
  );
};
