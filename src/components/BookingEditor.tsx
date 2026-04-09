import { useState } from "react";
import type { Booking } from "../types/booking";
import type { BookingFormErrors } from "../utils/bookingValidation";
import { validateBookingForm } from "../utils/bookingValidation";
import { FieldInput } from "./FieldInput";

type BookingEditorProps = {
  booking: Booking;
  onSave: (booking: Booking) => void;
  onCancel: () => void;
};

export const BookingEditor = ({
  booking,
  onSave,
  onCancel,
}: BookingEditorProps) => {
  const [form, setForm] = useState<Booking>(booking);
  const [errors, setErrors] = useState<BookingFormErrors>({});

  const handleChange = (field: keyof Omit<Booking, "id">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSave = () => {
    const nextErrors = validateBookingForm({
      name: form.name,
      date: form.date,
      service: form.service,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave(form);
  };

  return (
    <section className="booking-editor-card">
      <div className="booking-editor-header">
        <h2>Edit booking</h2>
        <p className="booking-editor-subtitle">
          Make changes and save when ready.
        </p>
      </div>

      <FieldInput
        id="edit-name"
        label="Name"
        placeholder="Enter guest name"
        value={form.name}
        onChange={(value) => handleChange("name", value)}
        error={errors.name}
        required
      />

      <FieldInput
        id="edit-date"
        type="date"
        label="Date"
        value={form.date}
        onChange={(value) => handleChange("date", value)}
        error={errors.date}
        helper="Choose a present or future date"
        required
      />

      <FieldInput
        id="edit-service"
        label="Service"
        placeholder="Enter service type"
        value={form.service}
        onChange={(value) => handleChange("service", value)}
        error={errors.service}
        helper="Describe the booking service in 3+ characters"
        required
      />

      <div className="actions editor-actions">
        <button type="button" className="btn-primary" onClick={handleSave}>
          Save changes
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
};
