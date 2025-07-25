import React from "react";
import { BookFooter } from "./components/BookFooter";
import { BookForm } from "./components/BookForm";
import { Container } from "@/components/ui/container";

export const BookManagement = () => {
  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Booking
        </h1>
        <p className="text-gray-600">
          Book a shared resource. Note: 10-minute buffer time is automatically
          added before and after each booking.
        </p>
      </div>

      <BookForm />
      <BookFooter />
    </Container>
  );
};
