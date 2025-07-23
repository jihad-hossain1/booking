"use client";

import React, { useContext } from "react";
import { BookingContext } from "../BookingProvider";

export const useBookingContext = () => {
  const { state, dispatch } = useContext(BookingContext);

  const bookings = React.useMemo(() => state.bookings, [state.bookings]);

  const filter = React.useMemo(() => state.filter, [state.filter]);

  const updateFilter = React.useCallback(
    (newFilter: { query?: string ,date?: string}) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          filter: {
            ...state.filter,
            ...newFilter,
          },
        },
      });
    },
    [dispatch, state.filter]
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
