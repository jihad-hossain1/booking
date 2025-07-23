"use client";

import { useCallback, useEffect, useState } from "react";
import { useCalendarBookContext } from "./useCalendarBookContext";
import calendarUtils from "../utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetchCalendarBook = () => {
  const { dispatch, currentWeek } = useCalendarBookContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeekBookings = useCallback(async () => {
    try {
      setLoading(true);
      const weekStart = calendarUtils.getWeekStart(currentWeek);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const promises = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const params = new URLSearchParams({ date: dateStr });

        promises.push(
          fetch(`${API_URL}/booking?${params}`).then(res => res.json())
        );
      }

      const weekBookings = await Promise.all(promises);
      
      const allBookings = weekBookings.flat();

      dispatch({
        type: "UPDATE_STATE",
        payload: { bookings: allBookings },
      });

      setError(null);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [currentWeek]);

  useEffect(() => {
    fetchWeekBookings();
  }, [fetchWeekBookings]);

  return {
    loading,
    error,
    refetch: fetchWeekBookings,
  };
};
