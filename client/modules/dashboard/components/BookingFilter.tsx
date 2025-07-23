"use client";

import { RESOURCES } from "@/modules/book/utils/data";
import React from "react";
import { useBookingContext } from "../hooks/useBookingContext";
import { Filter } from "lucide-react";

export const BookingFilter = () => {
  const { filter, updateFilter, resetFilter } = useBookingContext();
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <div className="flex space-x-4 flex-1 max-sm:space-x-1">
          <div className="max-sm:text-xs">
            <label className="form-label">Resource</label>
            <select
              value={filter.query}
              onChange={(e) => updateFilter({ query: e.target.value })}
              className="form-input"
            >
              <option value="">All Resources</option>
              {RESOURCES.map((resource) => (
                <option key={resource} value={resource}>
                  {resource}
                </option>
              ))}
            </select>
          </div>
          <div className="max-sm:text-xs">
            <label className="form-label">Date</label>
            <input
              type="date"
              value={filter?.date as string}
              onChange={(e) => updateFilter({ date: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => resetFilter()}
              className="btn-secondary max-sm:text-xs max-sm:text-nowrap"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
