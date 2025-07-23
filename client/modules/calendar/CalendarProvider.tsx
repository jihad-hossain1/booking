"use client";

import React, { createContext, useReducer } from "react";
import { Action, State } from "./type";

type BookingContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const CalenderBookContext = createContext<BookingContextType>(
  {} as BookingContextType
);

export const initialState: State = {
  bookings: [],
  currentWeek: new Date(),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "UPDATE_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

type BookingProviderProps = {
  children: React.ReactNode;
};

export const CalendarBookProvider = ({ children }: BookingProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CalenderBookContext.Provider value={{ state, dispatch }}>
      {children}
    </CalenderBookContext.Provider>
  );
};
