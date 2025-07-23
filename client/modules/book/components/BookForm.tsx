"use client";

import React, { useState } from "react";
import { AlertCircle, Calendar, CheckCircle, Clock, User } from "lucide-react";
import { RESOURCES } from "../utils/data";
import { BookFormDataType } from "../type";
import { formatDuration } from "../utils/format-duration";

const initialState: BookFormDataType = {
  resource: "",
  startTime: "",
  endTime: "",
  requestedBy: "",
};

export const BookForm = () => {
  const [loading, setLoading] = useState(false);
  const [bookFormData, setBookFormData] = useState(initialState);
  const [resources, setResources] = useState(RESOURCES);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookFormData((prev) => ({ ...prev, [name]: value }));

    if (name == "startTime" && value) {
      const start_time = new Date(value);
      const end_time = new Date(start_time.getTime() + 60 * 60 * 1000); // Add 1 hour
      setBookFormData((prev) => ({
        ...prev,
        endTime: end_time.toISOString(),
      }));
    }
  };

  const validateForm = () => {
    const { resource, startTime, endTime, requestedBy } = bookFormData;

    if (!resource || !startTime || !endTime || !requestedBy) {
      setMessage({ type: "error", text: "All fields are required" });
      return false;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    if (start <= now) {
      setMessage({ type: "error", text: "Start time must be in the future" });
      return false;
    }

    if (end <= start) {
      setMessage({ type: "error", text: "End time must be after start time" });
      return false;
    }

    const durationMinutes = (Number(end) - Number(start)) / (1000 * 60);
    if (durationMinutes < 15) {
      setMessage({
        type: "error",
        text: "Booking duration must be at least 15 minutes",
      });
      return false;
    }

    if (durationMinutes > 120) {
      setMessage({
        type: "error",
        text: "Booking duration cannot exceed 2 hours",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resource: bookFormData.resource,
          startTime: bookFormData.startTime,
          endTime: bookFormData.endTime,
          requestedBy: bookFormData.requestedBy,
        }),
      });
      const data = await res.json();

      if (data?.success) {
        setMessage({ type: "success", text: "Booking created successfully!" });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
          setBookFormData(initialState);
        }, 2000);
      } else {
        setMessage({ type: "error", text: data?.error });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage({ type: "error", text: "Internal server error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDefaultTimeSet = React.useCallback(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0);
    const defaultStart = now.toISOString().slice(0, 16);
    now.setHours(now.getHours() + 1);
    const defaultEnd = now.toISOString().slice(0, 16);

    setBookFormData((prev) => ({
      ...prev,
      startTime: defaultStart,
      endTime: defaultEnd,
    }));
  }, []);

  React.useEffect(() => {
    handleDefaultTimeSet();
  }, []);

  return (
    <>
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type == "error"
              ? "bg-red-50 text-red-800"
              : "bg-green-50 text-green-800"
          }`}
        >
          {message.type == "error" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="form-label">
            <Calendar className="inline h-4 w-4 mr-1" />
            Resource
          </label>
          <select
            value={bookFormData.resource}
            onChange={handleInputChange}
            name="resource"
            className="form-input"
            required
          >
            <option value="">Select a resource</option>
            {resources.map((resource) => (
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
              value={bookFormData.startTime}
              onChange={handleInputChange}
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
              value={bookFormData.endTime}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Duration:</strong>{" "}
            {formatDuration(bookFormData.startTime, bookFormData.endTime)}
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
            value={bookFormData.requestedBy}
            onChange={handleInputChange}
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
