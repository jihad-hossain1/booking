"use client";

import React, { useContext } from "react";
import { BookingContext } from "../BookingProvider";

export const useBookingContext = () => {
  const { state, dispatch } = useContext(BookingContext);

  const bookings = React.useMemo(() => state.bookings, [state.bookings]);

  const filter = React.useMemo(() => state.filter, [state.filter]);

  const updateFilter = React.useCallback(
    (filter: { query?: string }) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          filter,
        },
      });
    },
    [dispatch]
  );

  const resetFilter = React.useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, [dispatch]);

  return {
    ...state,
    dispatch,
    bookings,
    filter,
    updateFilter,
    resetFilter,
  };
};
