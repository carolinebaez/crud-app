import type { Booking } from "../types/booking";
import { useBookingForm } from "../hooks/useBookingForm";
import { FieldInput } from "./FieldInput";

type Props = {
  onAdd: (booking: Booking) => void;
};

export const BookingForm = ({ onAdd }: Props) => {
  const {
    formData,
    fieldErrors,
    updateField,
    validateField,
    handleSubmit,
    isFormValid,
  } = useBookingForm(onAdd);

  return (
    <form onSubmit={handleSubmit} className="booking-form-card">
      <h3>Create Booking</h3>

      <FieldInput
        id="name"
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
        onBlur={() => validateField("name")}
        helper="Guest name should be at least 2 characters."
        error={fieldErrors.name}
        required
      />

      <FieldInput
        id="date"
        type="date"
        label="Date"
        value={formData.date}
        onChange={(value) => updateField("date", value)}
        onBlur={() => validateField("date")}
        helper="Choose today or any upcoming date."
        error={fieldErrors.date}
        required
      />

      <FieldInput
        id="service"
        label="Service"
        placeholder="Enter service type"
        value={formData.service}
        onChange={(value) => updateField("service", value)}
        onBlur={() => validateField("service")}
        helper="Describe the booking service in 3 or more characters."
        error={fieldErrors.service}
        required
      />

      <button
        type="submit"
        className="submit-button"
        disabled={!isFormValid}
        title="Please provide the necessary booking details."
      >
        Add booking
      </button>
    </form>
  );
};
