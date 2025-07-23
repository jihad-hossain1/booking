"use client";

import { useCallback, useEffect } from "react";
import { useBookingContext } from "./useBookingContext";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/booking`;

export const useFetchBooking = () => {
  const { filter, dispatch } = useBookingContext();
  const apiUrl = `${baseUrl}?query=${filter?.query}&date=${filter?.date}`;

  const { data, error, mutate, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 10000,
    keepPreviousData: false,
  });

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          bookings: data || [],
          totalPages: 0,
        },
      });
    }
  }, [data, dispatch]);

  return {
    isLoading,
    error,
    refetch,
  };
};
