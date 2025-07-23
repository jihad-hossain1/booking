"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useCalendarBookContext } from "../hooks/useCalendarBookContext";
import calendarUtils from "../utils";

export const CalendarControl = () => {
  const { currentWeek, updateCurrentWeek } = useCalendarBookContext();

  const navigateWeek = (direction: number) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + direction * 7);
    updateCurrentWeek(newWeek);
  };

  const weekStart = calendarUtils.getWeekStart(currentWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return (
    <div className="card mb-3 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigateWeek(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {calendarUtils
              .getWeekStart(currentWeek)
              .toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
          </h2>
          <p className="text-sm text-gray-600">
            {calendarUtils
              .getWeekStart(currentWeek)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
            -{" "}
            {weekEnd.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => navigateWeek(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
