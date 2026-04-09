export type BookingFormData = {
  name: string;
  date: string;
  service: string;
};

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

const MIN_SERVICE_LENGTH = 3;

export const validateBookingForm = (
  data: BookingFormData
): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!data.date) {
    errors.date = "Date is required.";
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      errors.date = "Date is invalid.";
    } else if (selectedDate < today) {
      errors.date = "Booking date must be today or a future date.";
    }
  }

  if (!data.service.trim()) {
    errors.service = "Service is required.";
  } else if (data.service.trim().length < MIN_SERVICE_LENGTH) {
    errors.service = `Service must be at least ${MIN_SERVICE_LENGTH} characters.`;
  }

  return errors;
};