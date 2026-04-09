import { useMemo, useState } from "react";
import type { Booking } from "../types/booking";

const STORAGE_KEY = "bookings";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as Booking[]) : [];
    } catch {
      return [];
    }
  });

  useMemo(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const updateBooking = (updatedBooking: Booking) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
  };

  return { bookings, addBooking, deleteBooking, updateBooking };
};