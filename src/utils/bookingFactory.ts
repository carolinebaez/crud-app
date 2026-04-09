import { v4 as uuid } from "uuid";
import type { Booking } from "../types/booking";
import type { BookingFormData } from "./bookingValidation";

export const createBooking = (data: BookingFormData): Booking => {
  return {
    id: uuid(),
    name: data.name,
    date: data.date,
    service: data.service,
  };
};