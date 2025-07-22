import React from "react";

export const BookFooter = () => {
  return (
    <div className="mt-6 card">
      <h3 className="font-semibold text-gray-900 mb-2">Booking Rules</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Minimum booking duration: 15 minutes</li>
        <li>• Maximum booking duration: 2 hours</li>
        <li>
          • 10-minute buffer time is automatically added before and after each
          booking
        </li>
        <li>
          • Bookings cannot overlap with existing reservations (including buffer
          time)
        </li>
        <li>• Start time must be in the future</li>
      </ul>
    </div>
  );
};
