import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Resource Booking App.
          </h1>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/book"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              New Booking
            </Link>
            <Link
              href="/calendar"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Calendar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
