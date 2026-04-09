import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Booking } from "../types/booking";
import {
  validateBookingForm,
  type BookingFormData,
  type BookingFormErrors,
} from "../utils/bookingValidation";
import { createBooking } from "../utils/bookingFactory";
import { useToast } from "../components/ToastContext";

export const useBookingForm = (onAdd: (booking: Booking) => void) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    date: "",
    service: "",
  });
  const [fieldErrors, setFieldErrors] = useState<BookingFormErrors>({});

  const validateForm = useMemo(
    () => validateBookingForm(formData),
    [formData]
  );

  const validateField = (field: keyof BookingFormData) => {
    const fieldError = validateBookingForm(formData)[field];
    setFieldErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));
  };

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateBookingForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    const newBooking = createBooking(formData);
    onAdd(newBooking);

    setFormData({
      name: "",
      date: "",
      service: "",
    });
    setFieldErrors({});
    showToast("Booking added successfully.", "success");
  };

  return {
    formData,
    fieldErrors,
    updateField,
    validateField,
    handleSubmit,
    isFormValid: Object.keys(validateForm).length === 0,
  };
};