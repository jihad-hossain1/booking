"use client";

import React, { useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { RESOURCES } from "../utils/data";

export const BookForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO:
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="form-label">
            <Calendar className="inline h-4 w-4 mr-1" />
            Resource
          </label>
          <select name="resource" className="form-input" required>
            <option value="">Select a resource</option>
            {RESOURCES.map((resource) => (
              <option key={resource} value={resource}>
                {resource}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              <Clock className="inline h-4 w-4 mr-1" />
              Start Time
            </label>
            <input
              type="datetime-local"
              name="startTime"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">
              <Clock className="inline h-4 w-4 mr-1" />
              End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Duration:</strong> 1 Hour
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Remember: 10-minute buffer time will be added before and after your
            booking
          </p>
        </div>

        <div>
          <label className="form-label">
            <User className="inline h-4 w-4 mr-1" />
            Requested By
          </label>
          <input
            type="text"
            name="requestedBy"
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Booking..." : "Create Booking"}
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
