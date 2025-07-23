"use client";

import React, { createContext, useReducer } from "react";
import { Action, State } from "./type";

type BookingContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType
);

export const initialState: State = {
  bookings: [],
  filter: {
    query: "",
    date: "",
  },
  sort: {
    column: "createdAt",
    direction: "desc",
  },
  page: 1,
  pageSize: 10,
  totalPages: 1,
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

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
