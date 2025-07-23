"use client";

import React, { useContext } from "react";
import { CalenderBookContext } from "../CalendarProvider";

export const useCalendarBookContext = () => {
  const { state, dispatch } = useContext(CalenderBookContext);

  const bookings = React.useMemo(() => state.bookings, [state.bookings]);

  const updateCurrentWeek = React.useCallback(
    (newDate: string | Date) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          currentWeek: newDate,
        },
      });
    },
    [dispatch, state.currentWeek]
  )

  return {
    ...state,
    dispatch,
    bookings,
    updateCurrentWeek
  };
};
